"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="mx-auto size-12 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center">
          <AlertCircle className="size-6 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Something went wrong
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            {error.message || "Failed to load the tracking service. Please try again."}
          </p>
        </div>
        <Button
          onClick={() => reset()}
          size="sm"
          className="gap-2 text-xs font-medium w-full"
        >
          <RefreshCw className="size-3.5" />
          Reload Application
        </Button>
      </div>
    </div>
  );
}
