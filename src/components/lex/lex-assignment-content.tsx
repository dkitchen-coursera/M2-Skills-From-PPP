"use client";

import { useState } from "react";
import clsx from "clsx";
import type { LexItem } from "@/lib/lex-types";

interface LexAssignmentContentProps {
  item: LexItem;
  onComplete: () => void;
}

const MOCK_QUESTIONS = [
  {
    question: "Which of the following best describes the primary goal of this skill area?",
    options: [
      "Reducing overall project complexity",
      "Applying systematic techniques to solve problems effectively",
      "Eliminating the need for collaboration",
      "Focusing exclusively on theoretical knowledge",
    ],
    correct: 1,
  },
  {
    question: "What is the recommended approach when applying new techniques in practice?",
    options: [
      "Jump directly to the most advanced method",
      "Start with foundational concepts and build progressively",
      "Avoid all existing frameworks",
      "Focus only on memorization",
    ],
    correct: 1,
  },
  {
    question: "How should practitioners evaluate their progress in skill development?",
    options: [
      "By comparing themselves to experts only",
      "Through consistent practice and reflection on outcomes",
      "By avoiding challenging tasks",
      "Through a single comprehensive test",
    ],
    correct: 1,
  },
];

export function LexAssignmentContent({ item, onComplete }: LexAssignmentContentProps) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(MOCK_QUESTIONS.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(onComplete, 1500);
  };

  const allAnswered = answers.every((a) => a !== null);
  const score = submitted
    ? MOCK_QUESTIONS.filter((q, i) => answers[i] === q.correct).length
    : 0;

  if (!started) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-[#fafbfc]">
        <div className="w-full max-w-lg rounded-2xl border border-[#e3e8ef] bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f6ff]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#0056d2" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 12h6M9 16h4" stroke="#0056d2" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#0f1114]">{item.title}</h2>
          <p className="mt-2 text-sm text-[#5b6780]">
            {item.type === "graded" ? "Graded assignment" : "Practice exercise"} · {item.durationMinutes} min · +{item.xpValue} XP
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {item.skillTags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f0f6ff] px-2.5 py-0.5 text-xs text-[#0056d2]">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => setStarted(true)}
            className="mt-6 rounded-lg bg-[#0056d2] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0048b0]"
          >
            Start {item.type === "graded" ? "Assignment" : "Practice"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-8 py-8">
        <h1 className="text-xl font-semibold text-[#0f1114]">{item.title}</h1>
        <p className="mt-1 text-sm text-[#5b6780]">
          {MOCK_QUESTIONS.length} questions · +{item.xpValue} XP
        </p>

        {submitted && (
          <div className={clsx(
            "mt-4 rounded-lg px-4 py-3 text-sm font-semibold",
            score === MOCK_QUESTIONS.length
              ? "bg-[#f0faf3] text-[#137333]"
              : "bg-[#fff7ed] text-[#c2410c]",
          )}>
            Score: {score}/{MOCK_QUESTIONS.length} ({Math.round((score / MOCK_QUESTIONS.length) * 100)}%)
          </div>
        )}

        <div className="mt-6 space-y-8">
          {MOCK_QUESTIONS.map((q, qIdx) => (
            <div key={qIdx}>
              <p className="text-sm font-semibold text-[#0f1114]">
                {qIdx + 1}. {q.question}
              </p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  const isCorrect = submitted && oIdx === q.correct;
                  const isWrong = submitted && isSelected && oIdx !== q.correct;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={clsx(
                        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                        isCorrect && "border-[#137333] bg-[#f0faf3]",
                        isWrong && "border-[#dc2626] bg-[#fef2f2]",
                        isSelected && !submitted && "border-[#0056d2] bg-[#f0f6ff]",
                        !isSelected && !isCorrect && !isWrong && "border-[#e3e8ef] hover:border-[#c1cad9]",
                      )}
                      disabled={submitted}
                    >
                      <div className={clsx(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                        isSelected || isCorrect ? "border-current" : "border-[#c1cad9]",
                      )}>
                        {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-current" />}
                      </div>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={clsx(
                "rounded-lg px-8 py-3 text-sm font-semibold text-white transition-colors",
                allAnswered ? "bg-[#0056d2] hover:bg-[#0048b0]" : "bg-[#c1cad9] cursor-not-allowed",
              )}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
