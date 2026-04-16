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
import { ONBOARDED_GATHERED_INFO, IN_PROGRESS_GATHERED_INFO } from "@/lib/mock-persona-data";
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
import { MyLearningPage } from "@/components/my-learning/my-learning-page";
import { LihpLoadingScreen } from "@/components/lihp/lihp-loading-screen";
import { FullScreenChat } from "@/components/chat/full-screen-chat";
import { ProtoToolsPanel } from "@/components/proto/proto-tools-panel";
import {
  setAllMastered,
  setRandomProgress,
  resetProgress,
  completeCourse,
} from "@/lib/skills-store";
import { LexPage } from "@/components/lex/lex-page";
import { CourseCompleteScreen } from "@/components/lex/course-complete-screen";

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

  // Compute initial phase and gathered info based on persona
  const initialPhase: AppPhase = (persona === "onboarded" || persona === "in-progress" || persona === "in-progress-skipped" || persona === "skipped") ? "browsing" : "entry";
  const initialGatheredInfo: GatheredInfo = persona === "onboarded"
    ? { ...ONBOARDED_GATHERED_INFO }
    : persona === "in-progress"
      ? { ...IN_PROGRESS_GATHERED_INFO }
      : { goal: null, skills: null, background: null, constraints: null };

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
  const [roleProgress, setRoleProgress] = useState<RoleProgress | null>(null);
  const [activeLexCourse, setActiveLexCourse] = useState<PlanCourse | null>(null);
  const [completedLexCourse, setCompletedLexCourse] = useState<PlanCourse | null>(null);
  const [completedCourseIds, setCompletedCourseIds] = useState<Set<string>>(new Set());
  const [planStarted, setPlanStarted] = useState(false);
  const [lexItemsCompleted, setLexItemsCompleted] = useState(0);
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

  const { messages, sendMessage, status, error } = useChat<ChatUIMessage>({
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
            const progress = createInitialProgress(role, roleData.gapAnalysis);
            setRoleProgress(progress);
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
    [phase, plan, gatheredInfo, sendMessage],
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
    setLexItemsCompleted(0);
    setPhase("learning");
  }, [setPhase]);

  const handleLexXpEarned = useCallback((skillXpMap: Record<string, number>) => {
    setRoleProgress(prev => prev ? completeCourse(prev, skillXpMap) : prev);
    setLexItemsCompleted(n => n + 1);
  }, []);

  // Proto tools handlers
  const handleProtoSetAllMastered = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(setAllMastered(roleProgress));
  }, [roleProgress]);

  const handleProtoSetRandomProgress = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(setRandomProgress(roleProgress));
  }, [roleProgress]);

  const handleProtoResetProgress = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(resetProgress(roleProgress));
  }, [roleProgress]);

  const handleProtoTriggerMastery = useCallback(() => {
    if (!roleProgress) return;
    setRoleProgress(setAllMastered(roleProgress));
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
    const progress = createInitialProgress(role, gapAnalysis);
    setRoleProgress(progress);
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

  // Determine if we should show My Learning page (post-onboarding phases)
  const showMyLearning = phase === "plan_generated" || phase === "plan_generating"
    || phase === "viewing_plan" || phase === "chatting"
    || phase === "role_mastery"
    || (phase === "browsing" && plan);

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
      {phase === "course_complete" && completedLexCourse ? (
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
          onSend={handleSend}
          onRetry={handleRetry}
          onRemoveCourse={handleRemoveCourse}
          onExploreAlternatives={handleExploreAlternatives}
          onNavigateHome={handleNavigateHome}
          onExploreNextRole={handleExploreNextRole}
          onResumeCourse={handleResumeCourse}
          onStartPlan={handleStartPlan}
          planStarted={planStarted}
        />
      ) : (
        /* Homepage — shown after onboarding when clicking logo */
        <Homepage
          learnerName="there"
          roleTitle={roleProgress?.roleTitle ?? gatheredInfo.goal ?? undefined}
          demandLabel={roleForHomepage?.demandLabel}
          roleProgress={roleProgress}
          onStartChat={handleStartChat}
          onNavigateMyLearning={handleNavigateMyLearning}
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
      />
    </div>
  );
}
