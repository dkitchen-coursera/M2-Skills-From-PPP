import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

const MODEL_MAP: Record<string, () => LanguageModel> = {
  // OpenAI — GPT-5.4 family (latest, March 2026)
  "gpt-5.4": () => openai("gpt-5.4"),
  "gpt-5.4-mini": () => openai("gpt-5.4-mini"),
  "gpt-5.4-nano": () => openai("gpt-5.4-nano"),
  "gpt-5.4-pro": () => openai("gpt-5.4-pro"),
  // OpenAI — GPT-5.2
  "gpt-5.2": () => openai("gpt-5.2"),
  // OpenAI — GPT-4.1 family
  "gpt-4.1": () => openai("gpt-4.1"),
  "gpt-4.1-mini": () => openai("gpt-4.1-mini"),
  // OpenAI — o-series reasoning models
  "o3": () => openai("o3"),
  "o4-mini": () => openai("o4-mini"),

  // Anthropic — Claude 4.6 family (latest, Feb 2026)
  "claude-opus-4.6": () => anthropic("claude-opus-4-6"),
  "claude-sonnet-4.6": () => anthropic("claude-sonnet-4-6"),
  // Anthropic — Claude 4.5 family
  "claude-opus-4.5": () => anthropic("claude-opus-4-5"),
  "claude-haiku-4.5": () => anthropic("claude-haiku-4-5-20251001"),
  // Anthropic — short aliases (point to latest)
  "claude-opus": () => anthropic("claude-opus-4-6"),
  "claude-sonnet": () => anthropic("claude-sonnet-4-6"),
  "claude-haiku": () => anthropic("claude-haiku-4-5-20251001"),

  // Google — Gemini 3.1 family (latest, 2026)
  "gemini-3.1-pro": () => google("gemini-3.1-pro-preview"),
  "gemini-3.1-flash": () => google("gemini-3.1-flash-image-preview"),
  "gemini-3.1-flash-lite": () => google("gemini-3.1-flash-lite-preview"),
  // Google — short aliases (point to latest)
  "gemini-pro": () => google("gemini-3.1-pro-preview"),
  "gemini-flash": () => google("gemini-3.1-flash-image-preview"),
};

export function getModel(name?: string, fallback?: string): LanguageModel {
  const key = name ?? fallback ?? "gpt-4.1-mini";
  const factory = MODEL_MAP[key];
  if (!factory) return openai(key); // try as raw model ID
  return factory();
}

export const AVAILABLE_MODELS = Object.keys(MODEL_MAP);
