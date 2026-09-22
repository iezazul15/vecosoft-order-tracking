import * as React from "react";
import { Check, Clock, PackageCheck, AlertCircle } from "lucide-react";
import type { TimelineStep } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  timeline: TimelineStep[];
  isDelayed?: boolean;
}

export function OrderTimeline({ timeline, isDelayed = false }: OrderTimelineProps) {
  // If timeline is empty (tracking_not_available state)
  if (!timeline || timeline.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Delivery Timeline
          </h3>
          <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            Pending Dispatch
          </span>
        </div>

        <div className="py-6 text-center space-y-3">
          <div className="mx-auto size-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
            <PackageCheck className="size-6 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Courier Has Not Picked Up Yet
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Your items are currently being packed and verified at our fulfillment center. Real-time GPS and carrier checkpoints will appear here once scanned by the driver.
            </p>
          </div>
        </div>

        <div className="p-3 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-neutral-400 shrink-0" />
            <span>Estimated tracking activation: <strong>Within 24 hours</strong></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Delivery Journey
        </h3>
        <span className="text-[11px] text-neutral-400">Real-time updates</span>
      </div>

      <div className="relative pl-1">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;
          const isCompleted = step.completed;
          const isCurrent = step.current;

          return (
            <div key={step.key} className="relative flex items-start gap-3.5 pb-6 last:pb-1 group">
              {/* Vertical connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[13px] top-[24px] w-[2px] bottom-0 transition-colors",
                    isCompleted
                      ? "bg-emerald-500/80"
                      : isCurrent
                      ? "bg-gradient-to-b from-emerald-500 via-neutral-200 to-neutral-200 dark:via-neutral-800 dark:to-neutral-800"
                      : "bg-neutral-200 dark:bg-neutral-800"
                  )}
                />
              )}

              {/* Node indicator */}
              <div className="relative z-10 flex items-center justify-center shrink-0">
                {isCompleted ? (
                  <div className="size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Check className="size-3.5 stroke-[2.8]" />
                  </div>
                ) : isCurrent ? (
                  <div className="relative flex items-center justify-center size-7">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <div
                      className={cn(
                        "size-7 rounded-full text-white flex items-center justify-center shadow-sm",
                        isDelayed ? "bg-amber-600" : "bg-emerald-600"
                      )}
                    >
                      {isDelayed ? (
                        <AlertCircle className="size-3.5 stroke-[2.5]" />
                      ) : (
                        <span className="size-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="size-7 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center">
                    <span className="size-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={cn(
                      "text-xs leading-none transition-colors",
                      isCurrent
                        ? isDelayed
                          ? "font-bold text-amber-700 dark:text-amber-400"
                          : "font-bold text-neutral-900 dark:text-white"
                        : isCompleted
                        ? "font-medium text-neutral-800 dark:text-neutral-200"
                        : "text-neutral-400 dark:text-neutral-500 font-normal"
                    )}
                  >
                    {step.label}
                    {isCurrent && (
                      <span
                        className={cn(
                          "ml-2 text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-md",
                          isDelayed
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        )}
                      >
                        {isDelayed ? "Delayed" : "Current Step"}
                      </span>
                    )}
                  </h4>

                  {step.timestamp && (
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500 tabular-nums shrink-0">
                      {step.timestamp}
                    </span>
                  )}
                </div>

                {isCurrent && (
                  <p className="text-[11px] text-neutral-500 mt-1 leading-snug">
                    {step.key === "processing" && "Order items verified and packed by merchant."}
                    {step.key === "shipped" && "Transferred to carrier sorting facility."}
                    {step.key === "out_for_delivery" &&
                      (isDelayed
                        ? "Carrier in transit. Delivery schedule is being recalculated."
                        : "Courier van is nearby and heading toward your address.")}
                    {step.key === "delivered" && "Delivered to your safe delivery location."}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
