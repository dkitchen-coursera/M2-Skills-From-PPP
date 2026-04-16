import { buildSystemPrompt } from "./default";

export function buildSystemPromptOnboarded(goal?: string, skills?: string): string {
  const base = buildSystemPrompt();
  const goalText = goal ?? "Data Analyst";
  const skillsText = skills ?? "SQL, Python, Data Visualization";

  return `${base}

## Pre-filled Onboarding Context

This user has already completed partial onboarding outside of this conversation. The following information is already known:
- **Goal**: ${goalText}
- **Skills**: ${skillsText}

The user has NOT provided timeline/availability information.

## First Message Behavior

The user's first message will be "Hi" (an automatic trigger from clicking the CTA). Your very first response should:
1. Warmly greet the user by acknowledging their existing information
2. Reference their goal (${goalText}) and skills (${skillsText}) naturally
3. Ask ONLY about timeline/weekly availability — this is the only missing piece
4. Provide suggested_pills with timeline options (e.g., "3-6 months at 5 hrs/week", "1-3 months at 10 hrs/week", etc.)

Do NOT re-ask about goal or skills. They are already confirmed.

When calling report_conversation_state for the first response, set:
- gathered_info.goal: "${goalText}"
- gathered_info.skills: "${skillsText}"
- gathered_info.background: null
- gathered_info.constraints: null
- ready_for_plan: false`;
}
