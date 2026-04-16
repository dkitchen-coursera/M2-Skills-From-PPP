"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatStatus } from "ai";
import type { AppPhase, ChatUIMessage, StructuredPillData } from "@/lib/types";
import { MessageList } from "@/components/chat/message-list";
import { ContextualPills } from "@/components/chat/contextual-pills";
import { ChatInput } from "@/components/chat/chat-input";

interface ChatPanelProps {
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
}

export function ChatPanel({
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
}: ChatPanelProps) {
  const isBusy = status === "submitted" || status === "streaming";
  const hasPills = suggestedPills.options.length > 0;
  const [pillsDismissed, setPillsDismissed] = useState(false);
  const prevPillsRef = useRef(suggestedPills);

  // Multi-select: track the text composed from pill selections
  const [multiSelectText, setMultiSelectText] = useState("");

  // Reset dismissed state and multi-select text when new pills arrive
  useEffect(() => {
    if (prevPillsRef.current !== suggestedPills) {
      setPillsDismissed(false);
      setMultiSelectText("");
      prevPillsRef.current = suggestedPills;
    }
  }, [suggestedPills]);

  const showPills = hasPills && !pillsDismissed;
  const isMulti = suggestedPills.type === "multi";

  // Handle send for multi-select: clear state and dismiss pills
  const handleMultiSend = useCallback(
    (text: string) => {
      onSend(text);
      setMultiSelectText("");
      setPillsDismissed(true);
    },
    [onSend],
  );

  // When multi-select pill selections change, update the composed text
  const handleMultiSelectionChange = useCallback((text: string) => {
    setMultiSelectText(text);
  }, []);

  // When user edits the input directly in multi-select mode
  const handleExternalValueChange = useCallback((value: string) => {
    setMultiSelectText(value);
  }, []);

  // Handle single-select send: dismiss pills
  const handleSingleSelect = useCallback(
    (text: string) => {
      onSend(text);
      setPillsDismissed(true);
    },
    [onSend],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Messages area — takes remaining space */}
      <div className="flex w-full min-h-0 flex-1 flex-col overflow-hidden px-2">
        <MessageList
          messages={messages}
          status={status}
          error={error}
          phase={phase}
          isRefining={isRefining}
          planIndicators={planIndicators}
          hasPills={showPills}
          stripQuestions={stripQuestions}
          activePillQuestion={stripQuestions && showPills ? suggestedPills.question : undefined}
          onRetry={onRetry}
        />
      </div>

      {/* Bottom bar: pills + input */}
      <div className="shrink-0 border-t border-[#dae1ed] px-2 py-3">
        {showPills ? (
          <div className="flex flex-col gap-3">
            <div className="max-h-[50%] overflow-y-auto">
              <ContextualPills
                pills={suggestedPills}
                onSelect={handleSingleSelect}
                onMultiSelectionChange={handleMultiSelectionChange}
                onDismiss={() => setPillsDismissed(true)}
                disabled={isBusy}
              />
            </div>
            {isMulti ? (
              <ChatInput
                onSend={handleMultiSend}
                disabled={isBusy}
                placeholder={phase === "plan_generated" ? "Ask about selected courses..." : undefined}
                externalValue={multiSelectText}
                onExternalValueChange={handleExternalValueChange}
              />
            ) : (
              <ChatInput
                onSend={onSend}
                disabled={isBusy}
                placeholder={phase === "plan_generated" ? "Ask about selected courses..." : undefined}
              />
            )}
          </div>
        ) : (
          <ChatInput
            onSend={onSend}
            disabled={isBusy}
            placeholder={phase === "plan_generated" ? "Ask about selected courses..." : undefined}
          />
        )}
      </div>
    </div>
  );
}
