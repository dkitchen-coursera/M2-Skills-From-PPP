"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { ROLE_CATALOG } from "@/lib/role-catalog";

interface InferredRoleControlProps {
  inferredRoleId: string;
  inferredRoleTitle: string;
  confirmed: boolean;
  onConfirm: () => void;
  onChangeRole: (roleId: string) => void;
}

/**
 * Inline control rendered inside the My Learning warm banner's "Your career goal" line.
 * Replaces the static "Your career goal: X" text with an editable role picker plus
 * confirm / update affordances when the role is inferred (not yet confirmed).
 */
export function InferredRoleControl({
  inferredRoleId,
  inferredRoleTitle,
  confirmed,
  onConfirm,
  onChangeRole,
}: InferredRoleControlProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setPickerOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [pickerOpen]);

  const handlePick = (roleId: string) => {
    if (roleId !== inferredRoleId) {
      onChangeRole(roleId);
    }
    setPickerOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {!confirmed && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-[#0056d2]">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} /> Inferred goal
        </span>
      )}

      <span className="text-sm text-[#5b6780]">
        {confirmed
          ? "Your career goal:"
          : "Based on your activity, it looks like you're aiming for:"}
      </span>

      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => setPickerOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#dae1ed] bg-white px-2.5 py-1 text-sm font-semibold text-[#0f1114] transition-colors hover:border-[#0056d2] hover:bg-[#f7f9fc]"
        >
          {inferredRoleTitle}
          <ChevronDown className="h-3.5 w-3.5 text-[#4d5765]" strokeWidth={2} />
        </button>

        {pickerOpen && (
          <div
            ref={popoverRef}
            className="absolute left-0 top-full z-30 mt-1 w-[280px] rounded-lg border border-[#dae1ed] bg-white py-1 shadow-lg"
          >
            <div className="border-b border-[#f0f2f5] px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#4d5765]">
                Change role goal
              </p>
            </div>
            {ROLE_CATALOG.map((role) => (
              <button
                key={role.id}
                onClick={() => handlePick(role.id)}
                className={
                  "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[#f7f9fc] " +
                  (role.id === inferredRoleId
                    ? "bg-[#f7f9fc] font-semibold text-[#0056d2]"
                    : "text-[#0f1114]")
                }
              >
                <div>
                  <div>{role.title}</div>
                  <div className="text-xs text-[#4d5765]">{role.category}</div>
                </div>
                {role.id === inferredRoleId && (
                  <Check className="h-4 w-4 shrink-0 text-[#0056d2]" strokeWidth={2.5} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {!confirmed && (
        <div className="flex items-center gap-2">
          <button
            onClick={onConfirm}
            className="inline-flex h-8 items-center justify-center rounded-md bg-[#0056d2] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#003e9c]"
          >
            Yes, that&rsquo;s right
          </button>
          <button
            onClick={() => setPickerOpen(true)}
            className="inline-flex h-8 items-center justify-center rounded-md border border-[#dae1ed] bg-white px-3 text-xs font-semibold text-[#0f1114] transition-colors hover:border-[#0056d2] hover:text-[#0056d2]"
          >
            Update
          </button>
        </div>
      )}

      {confirmed && (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f5ee] px-2 py-0.5 text-[11px] font-semibold text-[#0a7d44]">
          <Check className="h-3 w-3" strokeWidth={2.5} /> Confirmed
        </span>
      )}
    </div>
  );
}
