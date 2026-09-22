import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {/* Status banner skeleton */}
      <Card className="rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 shadow-xs">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          <Skeleton className="h-14 w-full rounded-xl" />
        </CardContent>
      </Card>

      {/* Timeline skeleton */}
      <Card className="rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-5 shadow-xs">
        <CardContent className="p-0 space-y-5">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2.5 w-16" />
          </div>

          <div className="space-y-6 pl-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3.5">
                <Skeleton className="size-7 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-40" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary skeleton */}
      <Card className="rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-5 shadow-xs">
        <CardContent className="p-0 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}
