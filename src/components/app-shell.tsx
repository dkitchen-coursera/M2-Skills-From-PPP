"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type {
  AppPhase,
  GatheredInfo,
  Persona,
  ChatUIMessage,
  ConversationStateData,
  StructuredPillData,
  DebugLogEntry,
  RoleIdentificationData,
} from "@/lib/types";
import {
  ONBOARDED_GATHERED_INFO,
  IN_PROGRESS_GATHERED_INFO,
  RETURNING_INFERRED_ROLE_ID,
  RETURNING_IN_PROGRESS_COURSES,
  RETURNING_RESUME_PLAN_COURSE,
  createReturningLearnerProgress,
} from "@/lib/mock-persona-data";
import type { LearningPlan, PlanCourse } from "@/lib/plan-types";
import { conversationStateSchema } from "@/lib/prompts/schemas";
import { findRoleById } from "@/lib/role-catalog";
import {
  createInitialProgress,
  type RoleProgress,
  type GapAnalysis,
} from "@/lib/skills-store";
import { EntryScreen } from "@/components/entry/entry-screen";
import { Homepage } from "@/components/home/homepage";
import { MyLearningPage, type TabId as MyLearningTabId } from "@/components/my-learning/my-learning-page";
import { LihpLoadingScreen } from "@/components/lihp/lihp-loading-screen";
import { FullScreenChat } from "@/components/chat/full-screen-chat";
import { ProtoToolsPanel } from "@/components/proto/proto-tools-panel";
import {
  setAllMastered,
  setRandomProgress,
  resetProgress,
  completeCourse,
  completeCourseByGroups,
  setAllMasteredGroups,
  setRandomProgressGroups,
  resetProgressGroups,
  isGroupRoleProgress,
  createInitialProgressForRole,
  type AnyRoleProgress,
  type GroupRoleProgress,
} from "@/lib/skills-store";
import { LexPage } from "@/components/lex/lex-page";
import { CourseCompleteScreen } from "@/components/lex/course-complete-screen";
import { UpgradeConfirmation } from "@/components/upgrade/upgrade-confirmation";

const metadataJsonRegex = /```json\s*(\{[\s\S]*?\})\s*```\s*$/;

function extractMetadataFromText(
  text: string,
): ConversationStateData | null {
  const match = text.match(metadataJsonRegex);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    const result = conversationStateSchema.safeParse(parsed);
    if (result.success) return result.data;
  } catch {
    // Ignore parse errors
  }
  return null;
}

export function AppShell() {
  const searchParams = useSearchParams();

  // Parse persona from query params
  const persona = (searchParams.get("persona") ?? "default") as Persona;

  // Tier flag — derived from persona name. C+ gates the personalized-plan feature.
  // Once a non-C+ learner upgrades through the simulated checkout, this flips to true
  // for the rest of the session via state (see hasCourseraPlus below).
  const initialHasCourseraPlus =
    persona === "new-cplus" ||
    persona === "returning-cplus" ||
    // Legacy personas — treat as C+ to keep their flows unchanged
    persona === "default" ||
    persona === "skipped" ||
    persona === "onboarded" ||
    persona === "in-progress" ||
    persona === "in-progress-skipped";

  const isReturning =
    persona === "returning-cplus" || persona === "returning-non-cplus";

  // Compute initial phase based on persona:
  // - new-cplus → entry (today's default flow)
  // - new-non-cplus → browsing (homepage with upsell)
  // - returning-* → browsing (My Learning gates on plan/inferred role)
  // - legacy returning personas → browsing (unchanged)
  const initialPhase: AppPhase =
    persona === "onboarded" ||
    persona === "in-progress" ||
    persona === "in-progress-skipped" ||
    persona === "skipped" ||
    persona === "new-non-cplus" ||
    persona === "returning-cplus" ||
    persona === "returning-non-cplus"
      ? "browsing"
      : "entry";

  const initialGatheredInfo: GatheredInfo = persona === "onboarded"
    ? { ...ONBOARDED_GATHERED_INFO }
    : persona === "in-progress"
      ? { ...IN_PROGRESS_GATHERED_INFO }
      : { goal: null, skills: null, background: null, constraints: null };

  const initialInferredRoleId = isReturning ? RETURNING_INFERRED_ROLE_ID : null;

  // Persona-aware chat API URL: onboarded and in-progress personas use the onboarded prompt variant
  const chatApiUrl = useMemo(() => {
    const prompt = searchParams.get("prompt");
    const isOnboardedFlow = persona === "onboarded" || persona === "in-progress";
    const effectivePrompt = isOnboardedFlow ? "onboarded" : prompt;
    let url = effectivePrompt ? `/api/chat?prompt=${encodeURIComponent(effectivePrompt)}` : "/api/chat";
    // Pass goal/skills so the system prompt is personalized
    if (isOnboardedFlow && initialGatheredInfo.goal) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}goal=${encodeURIComponent(initialGatheredInfo.goal)}`;
      if (initialGatheredInfo.skills) {
        url += `&skills=${encodeURIComponent(initialGatheredInfo.skills)}`;
      }
    }
    // Pass model selection if specified
    const modelParam = searchParams.get("model");
    if (modelParam) {
      const sep = url.includes("?") ? "&" : "?";
      url += `${sep}model=${encodeURIComponent(modelParam)}`;
    }
    return url;
  }, [searchParams, persona, initialGatheredInfo]);
  const promptVariant = searchParams.get("prompt");
  const isNonDefault = !!promptVariant && promptVariant !== "default";
  const modelParam = searchParams.get("model");
  const stripQuestions = searchParams.get("stripQuestions") === "true";

  const [phase, setPhaseState] = useState<AppPhase>(initialPhase);
  const phaseRef = useRef<AppPhase>(initialPhase);
  const setPhase = useCallback((next: AppPhase | ((prev: AppPhase) => AppPhase)) => {
    setPhaseState((prev) => {
      const value = typeof next === "function" ? next(prev) : next;
      phaseRef.current = value;
      return value;
    });
  }, []);
  const [suggestedPills, setSuggestedPills] = useState<StructuredPillData>({ type: "single", question: "", options: [] });
  const [gatheredInfo, setGatheredInfo] = useState<GatheredInfo>(initialGatheredInfo);

  // Tier + inferred-role state (Differentiated Segments)
  const [hasCourseraPlus, setHasCourseraPlus] = useState<boolean>(initialHasCourseraPlus);
  const [inferredRoleId, setInferredRoleIdState] = useState<string | null>(initialInferredRoleId);
  const [inferredRoleConfirmed, setInferredRoleConfirmed] = useState<boolean>(false);
  const inferredRole = inferredRoleId ? findRoleById(inferredRoleId) : null;
  const inferredRoleTitle = inferredRole?.title ?? null;

  // Mocked returning-learner script step — drives the scripted intro inside FullScreenChat.
  // null = not in script. Set when chat opens with an inferred role.
  const [mockChatStep, setMockChatStep] = useState<"confirm-role" | "scope-question" | null>(null);
  const buildMockedMessage = useCallback(
    (text: string): ChatUIMessage => ({
      id: `mock-intro-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: "assistant",
      parts: [{ type: "text", text }],
    }) as ChatUIMessage,
    [],
  );

  // Merge incoming gathered info — never overwrite non-null with null
  const mergeGatheredInfo = useCallback((incoming: GatheredInfo) => {
    setGatheredInfo((prev) => ({
      goal: incoming.goal ?? prev.goal,
      skills: incoming.skills ?? prev.skills,
      background: incoming.background ?? prev.background,
      constraints: incoming.constraints ?? prev.constraints,
    }));
  }, []);
  const [plan, setPlanState] = useState<LearningPlan | null>(null);
  const [pendingRemovals, setPendingRemovals] = useState<Set<string>>(new Set());
  const [isRefining, setIsRefining] = useState(false);
  const planCountRef = useRef(0); // tracks how many times a plan has been received
  const pillsSuppressed = useRef(false); // true after user signals satisfaction — blocks pill updates
  // Maps message index → indicator type. Accumulates across all plan events.
  const [planIndicators, setPlanIndicators] = useState<Map<number, "created" | "rebuilt" | "swapped">>(new Map());
  // Tracks the latest update type so the useEffect can compute the message index after render
  const [pendingIndicatorType, setPendingIndicatorType] = useState<"created" | "rebuilt" | "swapped" | null>(null);
  const messagesLengthRef = useRef(0); // tracks current messages length for onData
  // State type stays narrow (`RoleProgress`) for the duration of the area→group migration.
  // Data Analyst actually stores a `GroupRoleProgress` at runtime — a safe cast is used at
  // the handful of mutation sites that dispatch on shape via `isGroupRoleProgress`.
  // Phase 6 (UI sweep) widens downstream prop types properly.
  const [roleProgress, setRoleProgress] = useState<RoleProgress | null>(
    isReturning ? createReturningLearnerProgress() : null,
  );
  const [activeLexCourse, setActiveLexCourse] = useState<PlanCourse | null>(null);
  const [completedLexCourse, setCompletedLexCourse] = useState<PlanCourse | null>(null);
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<string>>(new Set());
  // Courses the learner has actually entered (via Resume / Start plan). The In Progress
  // tab only shows courses in this set (plus completed) — new learners with a plan but
  // who haven't opened any course yet see an empty state, not the full plan list.
  const [startedCourseIds, setStartedCourseIds] = useState<Set<string>>(new Set());
  const [planStarted, setPlanStarted] = useState(false);
  const [lexItemsCompleted, setLexItemsCompleted] = useState(0);
  // Which My Learning tab to land on the next time that page mounts.
  // Defaults to "my-plan"; set to "skills" when exiting LEX via "See skill progress".
  const [nextMyLearningTab, setNextMyLearningTab] = useState<MyLearningTabId>("my-plan");
  const lexTriggerModuleComplete = useRef<(() => void) | null>(null);
  const lexTriggerCourseComplete = useRef<(() => void) | null>(null);

  const setPlan = setPlanState;

  // Persist plan to localStorage on every change
  useEffect(() => {
    if (plan) {
      try { localStorage.setItem("ppp-learning-plan", JSON.stringify(plan)); } catch {}
    } else {
      try { localStorage.removeItem("ppp-learning-plan"); } catch {}
    }
  }, [plan]);
  const [loadingMinElapsed, setLoadingMinElapsed] = useState(false);
  const [firstTokenReceived, setFirstTokenReceived] = useState(false);
  const planTriggerSent = useRef(false);

  const chatTransport = useMemo(
    () => new DefaultChatTransport({ api: chatApiUrl }),
    [chatApiUrl],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat<ChatUIMessage>({
    transport: chatTransport,
    onData(dataPart) {
      // Surface server-side debug logs in browser console
      if (dataPart.type === "data-debug-log") {
        const { label, detail, ts } = dataPart.data as DebugLogEntry;
        console.log(
          `%c[server] ${label}%c ${ts}`,
          "color: #0056d2; font-weight: bold",
          "color: #888",
          detail ?? ""
        );
        return;
      }

      try {
        console.log("[AppShell] onData received:", dataPart.type);
        if (dataPart.type === "data-conversation-state") {
          const { gathered_info, ready_for_plan, suggested_pills } =
            dataPart.data;
          const currentPhase = phaseRef.current;
          console.log("[AppShell] conversation state:", { ready_for_plan, gathered_info, currentPhase });

          if (currentPhase === "plan_generated") {
            // Check if the model explicitly changed the goal (goal change flow):
            // the model sets a NEW goal (non-null) while nulling skills/constraints
            // to signal re-gathering is needed. DEFAULT_STATE (all nulls) does NOT trigger this.
            const goalChanged = gathered_info.goal !== null &&
              (gathered_info.skills === null || gathered_info.constraints === null);
            if (goalChanged && !ready_for_plan) {
              console.log("[AppShell] Goal change detected — resetting to conversation mode");
              // Use setGatheredInfo directly (not merge) so null values actually clear fields
              setGatheredInfo(gathered_info);
              // Clear the old plan so auto-send can fire after re-gathering
              setPlan(null);
              if (suggested_pills?.options?.length > 0) {
                setSuggestedPills(suggested_pills);
              }
              // Reset plan trigger so a new plan can be generated later
              planTriggerSent.current = false;
              planCountRef.current = 0;
              setPhase("chatting");
            } else {
              // Normal refinement — update gathered info and pills
              mergeGatheredInfo(gathered_info);
              if (suggested_pills?.options?.length > 0 && !pillsSuppressed.current) {
                setSuggestedPills(suggested_pills);
              }
            }
          } else if (currentPhase === "plan_generating" || currentPhase === "viewing_plan") {
            // Blocked — ignore conversation state during these phases
          } else {
            // Conversation phase
            mergeGatheredInfo(gathered_info);
            setSuggestedPills(suggested_pills);
            if (ready_for_plan) {
              console.log("[AppShell] AI signaled ready_for_plan — setting plan_generating");
              setPhase("plan_generating");
            }
          }
        }
        if (dataPart.type === "data-plan-generating") {
          const currentPhase = phaseRef.current;
          console.log("[AppShell] Plan generation started (server signal), phase:", currentPhase);
          if (currentPhase === "plan_generated" || currentPhase === "viewing_plan") {
            setIsRefining(true);
          } else {
            setPhase("plan_generating");
          }
        }
        if (dataPart.type === "data-learning-plan") {
          const planData = dataPart.data as LearningPlan;
          console.log("[AppShell] Learning plan received:");
          console.log("[AppShell]   Title:", planData?.title);
          console.log("[AppShell]   Summary:", JSON.stringify(planData?.summary));
          console.log("[AppShell]   Milestones:", planData?.milestones?.length);
          if (planData?.milestones) {
            for (const ms of planData.milestones) {
              console.log(`[AppShell]   Milestone: "${ms.name}" — ${ms.courses?.length} courses`);
              for (const c of ms.courses || []) {
                console.log(`[AppShell]     Course: "${c.name}" (${c.partners?.join(", ")})`);
              }
            }
          }
          planCountRef.current += 1;
          setPendingIndicatorType(planCountRef.current === 1 ? "created" : "rebuilt");
          pillsSuppressed.current = false; // new plan — allow refinement pills
          setPlan(planData);
          setPendingRemovals(new Set());
          setIsRefining(false);
          setPhase("plan_generated");
          // Infer plan scope from the plan title when it wasn't set earlier in
          // the flow. Titles follow the prompt convention: role plans end with
          // "Career Plan", skills plans end with "Mastery Plan". Only fill in
          // when scope is currently unset so we don't clobber the returning-
          // learner "choose scope" CTA value.
          setGatheredInfo((prev) => {
            if (prev.planScope) return prev;
            const title = planData?.title ?? "";
            const inferredScope: "role" | "skills" | null =
              /\bCareer Plan\b/i.test(title)
                ? "role"
                : /\bMastery Plan\b/i.test(title)
                  ? "skills"
                  : null;
            if (!inferredScope) return prev;
            return { ...prev, planScope: inferredScope };
          });
        }
        if (dataPart.type === "data-course-swap") {
          const swapData = dataPart.data as {
            milestoneId?: string;
            oldCourseId?: string;
            newCourse?: PlanCourse;
          };
          const { milestoneId, oldCourseId, newCourse } = swapData;

          if (!milestoneId || !oldCourseId || !newCourse) {
            console.error("[AppShell] Invalid course swap data, clearing pending state:", swapData);
            setPendingRemovals(new Set());
            setIsRefining(false);
            return;
          }

          console.log("[AppShell] Course swap:", { milestoneId, oldCourseId, newCourse: newCourse.name });
          let swapApplied = false;
          setPlan((prev) => {
            if (!prev) return prev;
            // Check if milestoneId and oldCourseId actually exist in the plan
            const targetMilestone = prev.milestones.find((ms) => ms.id === milestoneId);
            if (!targetMilestone || !targetMilestone.courses.some((c) => c.id === oldCourseId)) {
              console.error("[AppShell] Swap mismatch — milestoneId or oldCourseId not found in plan:", { milestoneId, oldCourseId });
              return prev;
            }
            swapApplied = true;
            return {
              ...prev,
              milestones: prev.milestones.map((ms) => {
                if (ms.id !== milestoneId) return ms;
                return {
                  ...ms,
                  courses: ms.courses.map((c) =>
                    c.id === oldCourseId ? newCourse : c
                  ),
                };
              }),
            };
          });
          planCountRef.current += 1;
          setPendingIndicatorType("swapped");
          setPendingRemovals(new Set());
          setIsRefining(false);
        }
        if (dataPart.type === "data-role-identified") {
          const roleData = dataPart.data as RoleIdentificationData;
          console.log("[AppShell] Role identified:", roleData.roleId, roleData.gapAnalysis);
          const role = findRoleById(roleData.roleId);
          if (role) {
            const progress = createInitialProgressForRole(role, roleData.gapAnalysis);
            setRoleProgress(progress as unknown as RoleProgress);
          }
        }
      } catch (err) {
        console.error("[AppShell] Error handling data part:", dataPart.type, err);
        // Always clear loading states so the UI doesn't get stuck
        setPendingRemovals(new Set());
        setIsRefining(false);
      }
    },
  });

  // Keep ref in sync so onData can read current message count
  useEffect(() => {
    messagesLengthRef.current = messages.length;
  }, [messages.length]);

  // Add indicator to the map at the last assistant message index.
  // Runs after render so messages array is current (avoids stale closure in onData).
  useEffect(() => {
    if (!pendingIndicatorType) return;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        setPlanIndicators((prev) => new Map(prev).set(i, pendingIndicatorType));
        setPendingIndicatorType(null);
        return;
      }
    }
  }, [pendingIndicatorType, messages.length]);

  // Fallback: extract metadata from the latest assistant message text
  // in case data parts are not available (e.g., inline JSON pattern).
  // Only runs when stream is idle to avoid parsing incomplete JSON.
  useEffect(() => {
    if (status !== "ready") return;
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant") return;

    const textPart = lastMsg.parts.find((p) => p.type === "text");
    if (!textPart || textPart.type !== "text") return;

    const metadata = extractMetadataFromText(textPart.text);
    if (!metadata) return;

    const currentPhase = phaseRef.current;

    if (currentPhase === "plan_generated") {
      if (metadata.suggested_pills?.options?.length > 0 && !pillsSuppressed.current) {
        setSuggestedPills(metadata.suggested_pills);
      }
    } else if (currentPhase !== "plan_generating" && currentPhase !== "viewing_plan") {
      setSuggestedPills(metadata.suggested_pills);
      mergeGatheredInfo(metadata.gathered_info);
      if (metadata.ready_for_plan) {
        console.log("[AppShell] Fallback: AI signaled ready_for_plan — setting plan_generating");
        setPhase("plan_generating");
      }
    }
  }, [messages, status, mergeGatheredInfo, setPhase]);

  // Start the minimum loading timer when phase enters "loading"
  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => setLoadingMinElapsed(true), 200);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleSend = useCallback(
    (text: string) => {
      console.log("[AppShell] handleSend, current phase:", phase, "hasPlan:", !!plan);

      // ── Mocked returning-learner script interceptor ──────────────────────
      // While the mocked intro script is active, intercept pill clicks instead of
      // sending them to the LLM. Advances the script or hands off cleanly.
      if (mockChatStep === "confirm-role" && inferredRoleTitle) {
        const isYes = text.toLowerCase().startsWith("yes,") || text.toLowerCase().includes(`aiming for ${inferredRoleTitle.toLowerCase()}`);
        if (isYes) {
          // Confirm + advance to scope question (still mocked)
          setInferredRoleConfirmed(true);
          const followup = `Great — let's build out your personalized plan for becoming a **${inferredRoleTitle}**. To start: would you like a plan that covers all the skills for this role, or one focused on specific skills you want to deepen?`;
          setMessages((prev) => [
            ...prev,
            { id: `mock-user-${Date.now()}`, role: "user", parts: [{ type: "text", text }] } as ChatUIMessage,
            buildMockedMessage(followup),
          ]);
          setSuggestedPills({
            type: "single",
            question: "How should we scope your plan?",
            options: [
              `Cover all skills for ${inferredRoleTitle}`,
              "Focus on specific skills I want to deepen",
              "Something else",
            ],
          });
          setMockChatStep("scope-question");
          return;
        }
        // "Update my goal" — drop the script and let the user type freely
        setMockChatStep(null);
        setMessages((prev) => [
          ...prev,
          { id: `mock-user-${Date.now()}`, role: "user", parts: [{ type: "text", text }] } as ChatUIMessage,
          buildMockedMessage("No problem — what role or skills are you actually aiming for?"),
        ]);
        setSuggestedPills({ type: "single", question: "", options: [] });
        // Clear the inferred goal so the LLM-driven flow can re-gather
        setGatheredInfo((prev) => ({ ...prev, goal: null }));
        return;
      }

      if (mockChatStep === "scope-question" && inferredRoleTitle) {
        const isRoleScope = text.toLowerCase().includes("cover all skills") ||
          text.toLowerCase().includes("all the skills");
        const planScope = isRoleScope ? "role" : "skills";
        // Hand off to the LLM with full context. The first real user message includes
        // the goal, the chosen scope, and a concrete request to begin gathering.
        setGatheredInfo((prev) => ({ ...prev, goal: prev.goal ?? inferredRoleTitle, planScope }));
        setMockChatStep(null);
        const handoff = isRoleScope
          ? `I want to become a ${inferredRoleTitle}, and I'd like a plan that covers the full set of skills for this role.`
          : `I want to become a ${inferredRoleTitle}, but I'd like to focus on specific skills I want to deepen rather than cover everything.`;
        setPhase("full_screen_chat");
        sendMessage({ text: handoff });
        return;
      }

      if (phase === "entry") {
        setPhase("full_screen_chat");
      }

      // Detect satisfaction signals — clear pills so they don't reappear
      if (phase === "plan_generated") {
        const lower = text.toLowerCase().trim();
        const satisfactionSignals = ["looks good", "no", "no thanks", "nope", "i'm good", "all good", "that's it", "perfect", "done", "good to go", "skip for now"];
        if (satisfactionSignals.some((s) => lower === s || lower === s + "!")) {
          setSuggestedPills({ type: "single", question: "", options: [] });
          pillsSuppressed.current = true;
        }
      }

      let messageText = text;

      // Inject rich plan context for refinement messages
      if (phase === "plan_generated" && plan) {
        if (!text.startsWith("[Current Plan]") && !text.startsWith("[REMOVE]") && !text.startsWith("[EXPLORE]")) {
          const summary = `Role: ${plan.summary.role} | Skills: ${plan.summary.skills.join(", ")} | Timeline: ${plan.summary.totalDuration} at ${plan.summary.hoursPerWeek}`;
          const learner = `Learner: goal=${gatheredInfo.goal ?? "?"}, skills=${gatheredInfo.skills ?? "?"}, background=${gatheredInfo.background ?? "none"}, timeline=${gatheredInfo.constraints ?? "?"}`;
          const milestones = plan.milestones
            .map((ms) => {
              const courses = ms.courses
                .map((c) => `  - ${c.name} [${c.id}] | ${c.productDifficultyLevel} | ${c.skills.join(", ")} | ${c.duration}`)
                .join("\n");
              return `${ms.name} (${ms.id}) — ${ms.estimatedWeeks} weeks\n${courses}`;
            })
            .join("\n\n");
          // Serialize plan courses so the server can pre-populate its cache
          const allCourses = plan.milestones.flatMap((ms) => ms.courses);
          const coursesJson = JSON.stringify(allCourses);
          messageText = `[Current Plan]\n${summary}\n${learner}\n\n${milestones}\n\n[PLAN_COURSES_JSON]${coursesJson}[/PLAN_COURSES_JSON]\n\n${text}`;
        }
      }

      sendMessage({ text: messageText });
    },
    [phase, plan, gatheredInfo, sendMessage, mockChatStep, inferredRoleTitle, setMessages, buildMockedMessage, setPhase],
  );

  const handleRemoveCourse = useCallback(
    (courseId: string, _courseName: string, milestoneId: string, _milestoneName: string) => {
      // Remove the course from the plan directly — no AI call needed
      setPlan((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          milestones: prev.milestones.map((ms) => {
            if (ms.id !== milestoneId) return ms;
            return { ...ms, courses: ms.courses.filter((c) => c.id !== courseId) };
          }),
        };
      });
    },
    [setPlan],
  );

  // Prevent concurrent swap attempts — true when a swap is already in flight
  const swapDisabled = pendingRemovals.size > 0 || status === "streaming" || status === "submitted";

  const handleExploreAlternatives = useCallback(
    (courseId: string, courseName: string, milestoneId: string, milestoneName: string) => {
      if (swapDisabled) return;
      // Include existing course IDs so the server can exclude duplicates
      const milestone = plan?.milestones.find((ms) => ms.id === milestoneId);
      const existingIds = milestone?.courses.map((c) => c.id).join(",") ?? "";
      setPendingRemovals((prev) => new Set(prev).add(courseId));
      handleSend(`[EXPLORE] Explore alternatives for "${courseName}" in "${milestoneName}" (${milestoneId}, ${courseId}) [existing:${existingIds}]`);
    },
    [handleSend, swapDisabled, plan],
  );

  // Clear pending shimmer states when stream finishes (fallback for failed swaps).
  // Track previous status to only clear on transition to "ready" (not on initial render).
  const prevStatusRef = useRef(status);
  useEffect(() => {
    const wasActive = prevStatusRef.current === "streaming" || prevStatusRef.current === "submitted";
    prevStatusRef.current = status;

    if (status === "ready" && wasActive) {
      if (pendingRemovals.size > 0) {
        setPendingRemovals(new Set());
      }
      if (isRefining) {
        setIsRefining(false);
      }
    }
  }, [status, pendingRemovals.size, isRefining]);

  // Track first token during loading phase
  useEffect(() => {
    if (phase === "loading" && status === "streaming") {
      setFirstTokenReceived(true);
    }
  }, [phase, status]);

  // Transition from loading to full-screen chat when both conditions met
  useEffect(() => {
    if (phase === "loading" && loadingMinElapsed && firstTokenReceived) {
      setPhase("full_screen_chat");
      setLoadingMinElapsed(false);
      setFirstTokenReceived(false);
    }
  }, [phase, loadingMinElapsed, firstTokenReceived]);

  // Auto-send plan generation trigger when AI signals ready_for_plan.
  // The model acknowledges the learner's last answer in its own turn,
  // then this effect fires a separate "Generate my learning plan" message
  // so plan generation appears as a distinct turn in the conversation.
  useEffect(() => {
    if (phase === "plan_generating" && !plan && !planTriggerSent.current) {
      if (status === "streaming" || status === "submitted") {
        return;
      }
      planTriggerSent.current = true;
      console.log("[AppShell] Auto-sending plan generation trigger");
      sendMessage({ text: "Generate my learning plan" });
    }
  }, [phase, status, plan, sendMessage]);

  // Fallback: if AI never sets ready_for_plan but all info is gathered,
  // trigger after a short debounce once the stream is idle.
  const allInfoGathered = !!(gatheredInfo.goal && gatheredInfo.skills && gatheredInfo.constraints);

  useEffect(() => {
    if (
      allInfoGathered &&
      !plan &&
      !planTriggerSent.current &&
      (phase === "chatting" || phase === "full_screen_chat") &&
      status !== "streaming" &&
      status !== "submitted"
    ) {
      const timer = setTimeout(() => {
        if (!planTriggerSent.current && !plan) {
          planTriggerSent.current = true;
          console.log("[AppShell] Fallback: all info gathered, triggering plan");
          setPhase("plan_generating");
          sendMessage({ text: "Generate my learning plan" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allInfoGathered, phase, status, plan, messages.length, sendMessage]);

  // Reset plan trigger and phase on error so retry can work
  useEffect(() => {
    if (error) {
      console.log("[AppShell] Error detected, resetting for retry");
      if (phase === "plan_generating" && !plan) {
        planTriggerSent.current = false;
        setPhase("full_screen_chat");
      }
      if (phase === "loading") {
        setPhase("full_screen_chat");
        setLoadingMinElapsed(false);
        setFirstTokenReceived(false);
      }
    }
  }, [error, phase, plan]);

  const handleRetry = useCallback(() => {
    const lastUserMsg = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUserMsg) return;

    const textPart = lastUserMsg.parts.find((p) => p.type === "text");
    if (textPart && textPart.type === "text") {
      sendMessage({ text: textPart.text });
    }
  }, [messages, sendMessage]);

  // Role mastery: explore next role — restart the chat flow
  const handleExploreNextRole = useCallback(() => {
    setRoleProgress(null);
    setPlan(null);
    planTriggerSent.current = false;
    planCountRef.current = 0;
    setPhase("full_screen_chat");
    sendMessage({ text: "Hi, I'd like to explore a new role goal." });
  }, [sendMessage, setPhase, setPlan]);

  // LEX: enter learning experience for a specific course
  const handleResumeCourse = useCallback((course: PlanCourse) => {
    setActiveLexCourse(course);
    setPlanStarted(true);
    setStartedCourseIds((prev) => {
      if (prev.has(course.id)) return prev;
      const next = new Set(prev);
      next.add(course.id);
      return next;
    });
    setPhase("learning");
  }, [setPhase]);

  const handleStartPlan = useCallback(() => {
    if (!plan) return;
    const firstCourse = plan.milestones[0]?.courses[0];
    if (firstCourse) handleResumeCourse(firstCourse);
  }, [plan, handleResumeCourse]);

  const handleExitLex = useCallback(() => {
    setActiveLexCourse(null);
    setCompletedLexCourse(null);
    setNextMyLearningTab("my-plan");
    setPhase("plan_generated");
  }, [setPhase]);

  const handleSeeSkillProgress = useCallback(() => {
    setActiveLexCourse(null);
    setCompletedLexCourse(null);
    setNextMyLearningTab("skills");
    setPhase("plan_generated");
  }, [setPhase]);

  const handleCourseComplete = useCallback(() => {
    // Store the completed course, track its ID, and transition to course-complete screen
    if (activeLexCourse) {
      setCompletedCourseIds(prev => new Set(prev).add(activeLexCourse.id));
    }
    setCompletedLexCourse(activeLexCourse);
    setActiveLexCourse(null);
    setPhase("course_complete");
  }, [activeLexCourse, setPhase]);

  const handleCourseCompleteStartNext = useCallback((course: PlanCourse) => {
    setCompletedLexCourse(null);
    setActiveLexCourse(course);
    setPlanStarted(true);
    setStartedCourseIds((prev) => {
      if (prev.has(course.id)) return prev;
      const next = new Set(prev);
      next.add(course.id);
      return next;
    });
    setLexItemsCompleted(0);
    setPhase("learning");
  }, [setPhase]);

  const handleLexXpEarned = useCallback((skillXpMap: Record<string, number>) => {
    setRoleProgress((prev) => {
      if (!prev) return prev;
      if (isGroupRoleProgress(prev)) {
        return completeCourseByGroups(prev, skillXpMap) as unknown as RoleProgress;
      }
      return completeCourse(prev, skillXpMap);
    });
    setLexItemsCompleted((n) => n + 1);
  }, []);

  // Proto tools handlers — dispatch on role shape so group-shaped progress
  // (Data Analyst post-refactor) mutates via the group-aware helpers.
  // Casts bridge the Phase 4/6 type-narrowing gap; runtime dispatch is via isGroupRoleProgress.
  const handleProtoSetAllMastered = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(
      isGroupRoleProgress(roleProgress)
        ? (setAllMasteredGroups(roleProgress) as unknown as RoleProgress)
        : setAllMastered(roleProgress),
    );
  }, [roleProgress]);

  const handleProtoSetRandomProgress = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(
      isGroupRoleProgress(roleProgress)
        ? (setRandomProgressGroups(roleProgress) as unknown as RoleProgress)
        : setRandomProgress(roleProgress),
    );
  }, [roleProgress]);

  const handleProtoResetProgress = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(
      isGroupRoleProgress(roleProgress)
        ? (resetProgressGroups(roleProgress) as unknown as RoleProgress)
        : resetProgress(roleProgress),
    );
  }, [roleProgress]);

  const handleProtoTriggerMastery = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(
      isGroupRoleProgress(roleProgress)
        ? (setAllMasteredGroups(roleProgress) as unknown as RoleProgress)
        : setAllMastered(roleProgress),
    );
    setPhase("role_mastery");
  }, [roleProgress, setPhase]);

  const handleProtoTriggerModuleComplete = useCallback(() => {
    lexTriggerModuleComplete.current?.();
  }, []);

  const handleProtoTriggerCourseComplete = useCallback(() => {
    lexTriggerCourseComplete.current?.();
  }, []);

  const handleProtoJumpToRole = useCallback((roleId: string) => {
    const role = findRoleById(roleId);
    if (!role) return;
    // Split skills by level: L1 skills are "should", first few L2 are "might", rest "optional"
    const l1Skills = role.skills.filter((s) => s.level.includes("1") || s.level.includes("Foundations"));
    const l2Skills = role.skills.filter((s) => s.level.includes("2") || s.level.includes("Advanced"));
    const gapAnalysis: GapAnalysis = {
      should: l1Skills.map((s) => s.id),
      might: l2Skills.slice(0, 3).map((s) => s.id),
      optional: l2Skills.slice(3).map((s) => s.id),
    };
    const progress = createInitialProgressForRole(role, gapAnalysis);
    setRoleProgress(progress as unknown as RoleProgress);
    // Reset plan so a new one can be generated
    setPlan(null);
    planTriggerSent.current = false;
    planCountRef.current = 0;
    // Update gathered info to reflect the role
    setGatheredInfo({
      goal: role.title,
      skills: role.skills.map((s) => s.name).join(", "),
      background: null,
      constraints: null,
    });
    setPhase("full_screen_chat");
    sendMessage({ text: `I want to become a ${role.title}` });
  }, [sendMessage, setPhase, setPlan]);

  // ── Inferred role handlers (Differentiated Segments) ──────────────────────
  const handleChangeInferredRole = useCallback((roleId: string) => {
    const role = findRoleById(roleId);
    if (!role) return;
    setInferredRoleIdState(roleId);
    // Editing keeps the current confirmation state (per spec).
    // If a synthetic roleProgress was being shown for the prior inferred role,
    // rebuild it for the new one so Skills tab re-filters live.
    if (!plan) {
      // Rebuild seeded progress under the new role; XP carries over by skillId where
      // shared, otherwise resets (createReturningLearnerProgress only seeds DA skills).
      const next = createReturningLearnerProgress();
      // If switched away from data-analyst, build a fresh empty progress for the new role
      if (roleId !== RETURNING_INFERRED_ROLE_ID) {
        const l1 = role.skills.filter((s) => s.level.includes("1") || s.level.includes("Foundations"));
        const l2 = role.skills.filter((s) => s.level.includes("2") || s.level.includes("Advanced"));
        const gap: GapAnalysis = {
          should: l1.map((s) => s.id),
          might: l2.slice(0, 3).map((s) => s.id),
          optional: l2.slice(3).map((s) => s.id),
        };
        setRoleProgress(createInitialProgressForRole(role, gap) as unknown as RoleProgress);
      } else {
        setRoleProgress(next);
      }
    }
  }, [plan]);

  const handleConfirmInferredRole = useCallback(() => {
    setInferredRoleConfirmed(true);
  }, []);

  // Upgrade flow — used by both new and returning non-C+ upsell CTAs
  const handleStartUpgrade = useCallback(() => {
    setPhase("upgrade_confirmation");
  }, [setPhase]);

  // Confirm upgrade — flips to C+ and routes into chat (with goal seeded if returning)
  const handleConfirmUpgrade = useCallback(() => {
    setHasCourseraPlus(true);
    if (inferredRoleTitle) {
      // Seed goal so chat skips the "what's your goal?" question
      setGatheredInfo((prev) => ({ ...prev, goal: prev.goal ?? inferredRoleTitle }));
      setPhase("full_screen_chat");
    } else {
      // New non-C+ has no inferred role — enter conversational flow fresh
      setPhase("entry");
    }
  }, [inferredRoleTitle, setPhase]);

  // Navigate to My Learning page (from homepage or header)
  const handleNavigateMyLearning = useCallback(() => {
    // If we have a plan, go to plan_generated to show My Learning with plan
    // Otherwise go to chatting/browsing
    if (plan) {
      setPhase("plan_generated");
    } else {
      setPhase("browsing");
    }
  }, [plan, setPhase]);

  // Navigate to Homepage (from My Learning header logo click)
  const handleNavigateHome = useCallback(() => {
    setPhase("browsing");
  }, [setPhase]);

  // Start chat from homepage hero CTA
  const handleStartChat = useCallback((message?: string) => {
    setPhase("full_screen_chat");
    if (message) {
      sendMessage({ text: message });
    }
  }, [sendMessage, setPhase]);

  // Returning learners with an inferred role click "Set up your plan" (C+) →
  // pre-fill the goal so the conversational flow can skip the "what's your goal?" step.
  const handleStartPlanSetup = useCallback((message?: string) => {
    if (inferredRoleTitle) {
      setGatheredInfo((prev) => ({ ...prev, goal: prev.goal ?? inferredRoleTitle }));
    }
    setPhase("full_screen_chat");
    if (message) {
      sendMessage({ text: message });
    }
  }, [inferredRoleTitle, sendMessage, setPhase]);

  // ── Mocked returning-learner conversational variant ───────────────────────
  // When a returning learner enters the chat with an inferred role goal, inject a
  // scripted assistant opening message + pills that adapt based on whether the role
  // is confirmed. Pill clicks either advance the script (confirm role → ask scope)
  // or hand off to the real LLM (scope choice → first real user message).

  // Seed the mocked intro when chat opens with an inferred role and no real messages yet
  useEffect(() => {
    if (phase !== "full_screen_chat") return;
    if (messages.length > 0) return;
    if (!inferredRoleTitle) return;
    if (mockChatStep !== null) return;

    if (!inferredRoleConfirmed) {
      const text = `Welcome back! Based on your activity, it looks like you're aiming to become a **${inferredRoleTitle}**. Does that sound right, or would you like to update your goal?`;
      setMessages([buildMockedMessage(text)]);
      // Trailing sentinel: SingleSelectCard drops the last option (freeform placeholder).
      setSuggestedPills({
        type: "single",
        question: "Confirm your goal",
        options: [
          `Yes, I'm aiming for ${inferredRoleTitle}`,
          "Update my goal",
          "Something else",
        ],
      });
      setMockChatStep("confirm-role");
    } else {
      const text = `Great — let's build out your personalized plan for becoming a **${inferredRoleTitle}**. To start: would you like a plan that covers all the skills for this role, or one focused on specific skills you want to deepen?`;
      setMessages([buildMockedMessage(text)]);
      setSuggestedPills({
        type: "single",
        question: "How should we scope your plan?",
        options: [
          `Cover all skills for ${inferredRoleTitle}`,
          "Focus on specific skills I want to deepen",
          "Something else",
        ],
      });
      setMockChatStep("scope-question");
    }
  }, [phase, messages.length, inferredRoleTitle, inferredRoleConfirmed, mockChatStep, setMessages, buildMockedMessage]);

  // Reset the mocked script when leaving chat (so re-entry can re-seed)
  useEffect(() => {
    if (phase !== "full_screen_chat" && phase !== "chatting") {
      setMockChatStep(null);
    }
  }, [phase]);

  // Exit button on full-screen chat — return to appropriate page
  const handleExitFullScreenChat = useCallback(() => {
    if (plan) {
      setPhase("plan_generated");
    } else {
      setPhase("entry");
    }
  }, [setPhase, plan]);

  // Get role demand label for homepage hero
  const roleForHomepage = roleProgress
    ? findRoleById(roleProgress.roleId)
    : null;

  // Determine if we should show My Learning page (post-onboarding phases).
  // Returning learners (inferredRoleId set) also land on My Learning even without a plan,
  // so they see their inferred role header + Plan/Skills views gated by tier.
  const showMyLearning = phase === "plan_generated" || phase === "plan_generating"
    || phase === "viewing_plan" || phase === "chatting"
    || phase === "role_mastery"
    || (phase === "browsing" && (plan || !!inferredRoleId));

  return (
    <div
      className="h-screen flex flex-col transition-all duration-500 ease-out"
    >
      {(isNonDefault || modelParam) && (
        <div className="bg-red-600 text-white text-center text-xs py-1 px-2 shrink-0">
          {[
            isNonDefault && `Prompt: ${promptVariant}`,
            modelParam && `Model: ${modelParam}`,
          ].filter(Boolean).join(" · ")}
        </div>
      )}
      {phase === "upgrade_confirmation" ? (
        <UpgradeConfirmation
          inferredRoleTitle={inferredRoleTitle}
          onConfirm={handleConfirmUpgrade}
        />
      ) : phase === "course_complete" && completedLexCourse ? (
        <CourseCompleteScreen
          completedCourse={completedLexCourse}
          plan={plan}
          roleProgress={roleProgress}
          onStartCourse={handleCourseCompleteStartNext}
          onBackToPlan={handleExitLex}
        />
      ) : phase === "learning" && activeLexCourse ? (
        <LexPage
          course={activeLexCourse}
          roleProgress={roleProgress}
          onXpEarned={handleLexXpEarned}
          onExit={handleExitLex}
          onCourseComplete={handleCourseComplete}
          itemsCompleted={lexItemsCompleted}
          onRegisterTriggerModuleComplete={(trigger) => { lexTriggerModuleComplete.current = trigger; }}
          onRegisterTriggerCourseComplete={(trigger) => { lexTriggerCourseComplete.current = trigger; }}
          onSeeSkillProgress={handleSeeSkillProgress}
        />
      ) : phase === "entry" ? (
        <EntryScreen onSend={handleSend} />
      ) : phase === "loading" ? (
        <LihpLoadingScreen />
      ) : phase === "full_screen_chat" ? (
        <FullScreenChat
          messages={messages as ChatUIMessage[]}
          status={status}
          error={error}
          suggestedPills={suggestedPills}
          phase={phase}
          isRefining={isRefining}
          planIndicators={planIndicators}
          stripQuestions={stripQuestions}
          onSend={handleSend}
          onRetry={handleRetry}
          onExit={handleExitFullScreenChat}
        />
      ) : showMyLearning ? (
        <MyLearningPage
          messages={messages as ChatUIMessage[]}
          status={status}
          error={error}
          suggestedPills={suggestedPills}
          gatheredInfo={gatheredInfo}
          plan={plan}
          phase={phase}
          isRefining={isRefining}
          planIndicators={planIndicators}
          stripQuestions={stripQuestions}
          pendingRemovals={pendingRemovals}
          swapDisabled={swapDisabled}
          roleProgress={roleProgress}
          completedCourseIds={completedCourseIds}
          startedCourseIds={startedCourseIds}
          seededInProgressCourses={isReturning ? RETURNING_IN_PROGRESS_COURSES : undefined}
          hasCourseraPlus={hasCourseraPlus}
          inferredRoleId={inferredRoleId}
          inferredRoleTitle={inferredRoleTitle}
          inferredRoleConfirmed={inferredRoleConfirmed}
          onChangeInferredRole={handleChangeInferredRole}
          onConfirmInferredRole={handleConfirmInferredRole}
          onUpgrade={handleStartUpgrade}
          onStartPlanSetup={handleStartPlanSetup}
          onResumeSeededCourse={() => handleResumeCourse(RETURNING_RESUME_PLAN_COURSE)}
          onSend={handleSend}
          onRetry={handleRetry}
          onRemoveCourse={handleRemoveCourse}
          onExploreAlternatives={handleExploreAlternatives}
          onNavigateHome={handleNavigateHome}
          onExploreNextRole={handleExploreNextRole}
          onResumeCourse={handleResumeCourse}
          onStartPlan={handleStartPlan}
          planStarted={planStarted}
          initialTab={nextMyLearningTab}
        />
      ) : (
        /* Homepage — shown after onboarding when clicking logo, or for new non-C+ */
        <Homepage
          learnerName="there"
          roleTitle={roleProgress?.roleTitle ?? gatheredInfo.goal ?? undefined}
          demandLabel={roleForHomepage?.demandLabel}
          roleProgress={roleProgress}
          hasCourseraPlus={hasCourseraPlus}
          onStartChat={handleStartChat}
          onNavigateMyLearning={handleNavigateMyLearning}
          onUpgrade={handleStartUpgrade}
        />
      )}
      <ProtoToolsPanel
        roleProgress={roleProgress}
        onSetAllMastered={handleProtoSetAllMastered}
        onSetRandomProgress={handleProtoSetRandomProgress}
        onResetProgress={handleProtoResetProgress}
        onTriggerMastery={handleProtoTriggerMastery}
        onTriggerModuleComplete={handleProtoTriggerModuleComplete}
        onTriggerCourseComplete={handleProtoTriggerCourseComplete}
        onJumpToRole={handleProtoJumpToRole}
        isInLex={phase === "learning" && !!activeLexCourse}
        hasCourseraPlus={hasCourseraPlus}
        onToggleCoursePlus={() => setHasCourseraPlus((v) => !v)}
        inferredRoleId={inferredRoleId}
        inferredRoleConfirmed={inferredRoleConfirmed}
        onResetInferredRoleConfirmation={() => setInferredRoleConfirmed(false)}
        onClearInferredRole={() => {
          setInferredRoleIdState(null);
          setInferredRoleConfirmed(false);
          if (!plan) setRoleProgress(null);
        }}
      />
    </div>
  );
}
