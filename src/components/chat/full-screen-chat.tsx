"use client";

import type { ChatStatus } from "ai";
import type { AppPhase, ChatUIMessage, StructuredPillData } from "@/lib/types";
import { Header } from "@/components/shared/header";
import { ChatPanel } from "@/components/chat/chat-panel";

interface FullScreenChatProps {
  messages: ChatUIMessage[];
  status: ChatStatus;
  error: Error | undefined;
  suggestedPills: StructuredPillData;
  phase?: AppPhase;
  isRefining?: boolean;
  planIndicators?: Map<number, "created" | "rebuilt" | "swapped">;
  stripQuestions?: boolean;
  onSend: (text: string) => void;
  onRetry: () => void;
  onExit: () => void;
}

export function FullScreenChat({
  messages,
  status,
  error,
  suggestedPills,
  phase,
  isRefining,
  planIndicators,
  stripQuestions,
  onSend,
  onRetry,
  onExit,
}: FullScreenChatProps) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header onExit={onExit} />
      <div className="flex flex-1 justify-center overflow-hidden">
        <div className="flex h-full w-full max-w-[700px] flex-col">
          <ChatPanel
            messages={messages}
            status={status}
            error={error}
            suggestedPills={suggestedPills}
            phase={phase}
            isRefining={isRefining}
            planIndicators={planIndicators}
            stripQuestions={stripQuestions}
            onSend={onSend}
            onRetry={onRetry}
          />
        </div>
      </div>
    </div>
  );
}
