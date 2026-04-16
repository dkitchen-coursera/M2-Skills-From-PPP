"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import clsx from "clsx";
import type { StructuredPillData } from "@/lib/types";

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-[2.4px] bg-[#0056d2]">
        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-3 w-3 shrink-0 items-center justify-center">
      <span className="h-[10.8px] w-[10.8px] rounded-[2.4px] border-[1.2px] border-[#8495b0] bg-white" />
    </span>
  );
}

function MultiSelectPills({
  options,
  onSelectionChange,
  disabled,
}: {
  options: string[];
  onSelectionChange: (text: string) => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Memoize to avoid new array reference on every render from .slice()
  const mainOptions = useMemo(
    () => (options.length > 1 ? options.slice(0, -1) : options),
    [options],
  );

  const toggle = useCallback(
    (option: string) => {
      if (disabled) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(option)) {
          next.delete(option);
        } else {
          next.add(option);
        }
        return next;
      });
    },
    [disabled],
  );

  // Notify parent only when selection actually changes
  useEffect(() => {
    const text = mainOptions.filter((o) => selected.has(o)).join(", ");
    onSelectionChange(text);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset selection when options change
  const prevOptionsRef = useRef(options);
  useEffect(() => {
    if (prevOptionsRef.current !== options) {
      setSelected(new Set());
      prevOptionsRef.current = options;
    }
  }, [options]);

  return (
    <div className="flex flex-wrap gap-2">
      {mainOptions.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => toggle(option)}
          disabled={disabled}
          className={clsx(
            "flex cursor-pointer items-center gap-1 rounded-[8px] border border-[#8495b0] bg-white px-3 py-1.5 text-sm text-[#0f1114] transition-colors",
            disabled && "!cursor-not-allowed opacity-50",
          )}
        >
          <CheckboxIcon checked={selected.has(option)} />
          {option}
        </button>
      ))}
    </div>
  );
}

function SingleSelectCard({
  options,
  onSelect,
  onSkip,
  disabled,
}: {
  options: string[];
  onSelect: (text: string) => void;
  onSkip: () => void;
  disabled?: boolean;
}) {
  // Filter out the last option ("Something else" / freeform placeholder)
  const mainOptions = options.length > 1 ? options.slice(0, -1) : options;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#dae1ed] bg-white px-4 py-5">
      <div className="flex flex-col gap-0.5">
        {mainOptions.map((option, idx) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={clsx(
              "flex cursor-pointer items-center gap-2 px-2 py-3 text-left transition-colors hover:bg-[#f2f5fa]",
              idx < mainOptions.length - 1 && "border-b border-[#dae1ed]",
              disabled && "!cursor-not-allowed opacity-50",
            )}
          >
            <div className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded bg-[#f2f5fa]">
              <span className="text-xs font-semibold text-[#0f1114]">{idx + 1}</span>
            </div>
            <span className="text-base text-[#0f1114]">{option}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onSkip}
        disabled={disabled}
        className="self-start text-sm font-semibold text-[#0056d2] hover:underline"
      >
        Skip For Now
      </button>
    </div>
  );
}

export function ContextualPills({
  pills,
  onSelect,
  onMultiSelectionChange,
  onDismiss,
  disabled,
}: {
  pills: StructuredPillData;
  onSelect: (text: string) => void;
  onMultiSelectionChange?: (text: string) => void;
  onDismiss?: () => void;
  disabled?: boolean;
}) {
  const [showCard, setShowCard] = useState(true);
  const prevPillsRef = useRef(pills);

  // Reset showCard when pills changes
  useEffect(() => {
    if (prevPillsRef.current !== pills) {
      setShowCard(true);
      prevPillsRef.current = pills;
    }
  }, [pills]);

  if (!showCard || pills.options.length === 0) return null;

  // Stable callback ref to avoid re-triggering the effect in MultiSelectPills
  const stableMultiChange = useCallback(
    (text: string) => onMultiSelectionChange?.(text),
    [onMultiSelectionChange],
  );

  // Multi-select: render checkbox pills
  if (pills.type === "multi") {
    return (
      <MultiSelectPills
        options={pills.options}
        onSelectionChange={stableMultiChange}
        disabled={disabled}
      />
    );
  }

  // Single-select: render numbered list card
  return (
    <SingleSelectCard
      options={pills.options}
      onSelect={(text) => {
        setShowCard(false);
        onDismiss?.();
        onSelect(text);
      }}
      onSkip={() => {
        setShowCard(false);
        onDismiss?.();
        onSelect("Skip for now");
      }}
      disabled={disabled}
    />
  );
}
