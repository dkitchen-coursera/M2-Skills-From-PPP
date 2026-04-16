import { buildSystemPrompt as buildDefault } from "./default";
import { buildSystemPromptExperimental as buildExperimental } from "./experimental";
import { buildSystemPromptExperimentalV2 as buildExperimentalV2 } from "./experimental-v2";
import { buildSystemPromptOnboarded as buildOnboarded } from "./onboarded";

/**
 * Registry of prompt builders keyed by URL param value.
 * To add a new variant, create `<name>.ts` in this directory,
 * export a builder function, and add it here.
 *
 * Builders that need extra options (like onboarded) accept them
 * via the options parameter passed through from getSystemPrompt.
 */
const promptRegistry: Record<string, (options?: PromptOptions) => string> = {
  default: () => buildDefault(),
  experimental: () => buildExperimental(),
  "experimental-v2": () => buildExperimentalV2(),
  onboarded: (opts) => buildOnboarded(opts?.goal, opts?.skills),
};

export interface PromptOptions {
  goal?: string;
  skills?: string;
}

export function getSystemPrompt(
  variant: string = "default",
  options?: PromptOptions,
): string {
  const builder = promptRegistry[variant];
  if (builder) return builder(options);
  return promptRegistry.default();
}
