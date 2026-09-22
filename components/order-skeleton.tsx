import * as React from "react";

export function OrderSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Status banner skeleton */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-1.5 flex-1">
            <div className="h-2.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
        </div>
        <div className="h-14 rounded-xl bg-neutral-100 dark:bg-neutral-800/60" />
      </div>

      {/* Timeline skeleton */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-5 space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-neutral-800">
          <div className="h-3 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-2.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>

        <div className="space-y-6 pl-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3.5">
              <div className="size-7 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                <div className="h-2.5 w-40 bg-neutral-100 dark:bg-neutral-800/50 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary skeleton */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-5 space-y-3">
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        <div className="h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/60" />
        <div className="h-16 rounded-xl bg-neutral-50 dark:bg-neutral-800/40" />
      </div>
    </div>
  );
}
