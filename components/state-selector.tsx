"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_STATES, type MockState, type StateTag } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tagColors: Record<StateTag, { dot: string; badge: string }> = {
  green: {
    dot: "bg-emerald-500 shadow-emerald-500/30",
    badge: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  },
  yellow: {
    dot: "bg-amber-500 shadow-amber-500/30",
    badge: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  },
  red: {
    dot: "bg-rose-500 shadow-rose-500/30",
    badge: "text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
  },
};

export function StateSelector({ currentStateId }: { currentStateId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const currentState =
    MOCK_STATES.find((s) => s.id === currentStateId) || MOCK_STATES[0];

  const handleSelect = (nextId: string) => {
    if (nextId === currentState.id) return;
    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("state", nextId);
      router.push(`/?${params.toString()}`);
    });
  };

  const healthyStates = MOCK_STATES.filter((s) => !s.isError && s.tag === "green");
  const edgeStates = MOCK_STATES.filter((s) => !s.isError && s.tag === "yellow");
  const errorStates = MOCK_STATES.filter((s) => s.isError);

  return (
    <div className="w-full flex items-center justify-between gap-3 p-2.5 bg-neutral-50/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 rounded-xl backdrop-blur-xs shadow-xs">
      <div className="flex items-center gap-2 min-w-0">
        <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0">
          <SlidersHorizontal className="size-3.5" />
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Simulator
          </span>
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
            {currentState.label}
          </span>
        </div>
      </div>

      <Select value={currentState.id} onValueChange={handleSelect}>
        <SelectTrigger
          aria-label="Select Mock State"
          size="sm"
          className={cn(
            "h-8 px-3 text-xs font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-2xs",
            isPending && "opacity-60 cursor-wait"
          )}
        >
          <div className="flex items-center gap-1.5 truncate">
            <span
              className={cn(
                "size-2 rounded-full shrink-0 shadow-xs",
                tagColors[currentState.tag].dot
              )}
            />
            <SelectValue>{currentState.label}</SelectValue>
          </div>
        </SelectTrigger>

        <SelectContent className="w-72 max-h-80 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 shadow-xl backdrop-blur-md">
          {/* Healthy Standard States */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Standard Delivery Flow
            </SelectLabel>
            {healthyStates.map((s) => (
              <SelectItemOption key={s.id} state={s} />
            ))}
          </SelectGroup>

          <SelectSeparator className="my-1 bg-neutral-100 dark:bg-neutral-800" />

          {/* Edge Scenarios (Delayed, Not Received, No Tracking) */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600/90 dark:text-amber-400/90">
              Required Edge Scenarios
            </SelectLabel>
            {edgeStates.map((s) => (
              <SelectItemOption key={s.id} state={s} />
            ))}
          </SelectGroup>

          <SelectSeparator className="my-1 bg-neutral-100 dark:bg-neutral-800" />

          {/* Simulated Error Variants */}
          <SelectGroup>
            <SelectLabel className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600/90 dark:text-rose-400/90">
              Simulated Error States (7)
            </SelectLabel>
            {errorStates.map((s) => (
              <SelectItemOption key={s.id} state={s} />
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function SelectItemOption({ state }: { state: MockState }) {
  return (
    <SelectItem
      value={state.id}
      className="text-xs text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer py-1.5 px-2.5"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={cn(
            "size-2 rounded-full shrink-0 shadow-xs",
            tagColors[state.tag].dot
          )}
        />
        <span className="truncate font-medium">{state.label}</span>
      </div>
    </SelectItem>
  );
}
