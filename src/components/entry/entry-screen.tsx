"use client";

import { useCallback, useState } from "react";
import { ChatInput } from "@/components/chat/chat-input";
import { Header } from "@/components/shared/header";
import { PromptPillRow } from "@/components/entry/prompt-pill-row";

const ROW_1_PILLS = [
  "I want to become a Data Analyst",
  "I want to become a UX Designer",
  "I want to become a Project Manager",
  "I want to become a Digital Marketing Specialist",
  "I want to become a Data Analyst",
  "I want to become a UX Designer",
  "I want to become a Project Manager",
];

const ROW_2_PILLS = [
  "I want to learn SQL and data visualization",
  "I want to learn SEO and content strategy",
  "I want to learn user research and prototyping",
  "I want to learn agile and stakeholder communication",
  "I want to learn SQL and data visualization",
  "I want to learn SEO and content strategy",
  "I want to learn user research and prototyping",
  "I want to learn agile and stakeholder communication",
];

const ROW_3_PILLS = [
  "I know what skills I want to work on",
  "Help me figure out my career path",
  "I want to switch from marketing to data",
  "I'm a beginner — where do I start?",
  "I know what skills I want to work on",
  "Help me figure out my career path",
  "I want to switch from marketing to data",
  "I'm a beginner — where do I start?",
];

interface EntryScreenProps {
  onSend: (text: string) => void;
  onExit?: () => void;
}

export function EntryScreen({ onSend, onExit }: EntryScreenProps) {
  const [isPillsHovered, setIsPillsHovered] = useState(false);
  const handlePillsMouseEnter = useCallback(() => setIsPillsHovered(true), []);
  const handlePillsMouseLeave = useCallback(() => setIsPillsHovered(false), []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header onExit={onExit} />
      <div
        className="flex flex-1 items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, #fff 0%, rgba(53,135,252,0.1) 33%, rgba(164,154,255,0.05) 67%, #fff 100%)",
        }}
      >
        <div className="flex w-full max-w-[746px] flex-col items-center px-4">
          {/* Greeting */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold leading-7 tracking-tight text-[#0f1114]">
              Hello! I can help you master the skills for your dream role.
            </h1>
            <p className="mt-1 text-2xl font-semibold leading-7 tracking-tight text-[#0f1114]">
              What role are you aiming for, or what skills do you want to build?
            </p>
          </div>

          {/* Chat Input */}
          <div className="mt-6 w-full">
            <ChatInput onSend={onSend} />
          </div>

          {/* Prompt Pill Rows — wider than input to match Figma */}
          <div
            className="mt-6 w-[calc(100%+300px)] max-w-[1030px] space-y-3"
            onMouseEnter={handlePillsMouseEnter}
            onMouseLeave={handlePillsMouseLeave}
          >
            <PromptPillRow pills={ROW_1_PILLS} onSelect={onSend} direction="left" isPaused={isPillsHovered} />
            <PromptPillRow pills={ROW_2_PILLS} onSelect={onSend} direction="left" isPaused={isPillsHovered} />
            <PromptPillRow pills={ROW_3_PILLS} onSelect={onSend} direction="left" isPaused={isPillsHovered} />
          </div>

        </div>
      </div>
    </div>
  );
}
