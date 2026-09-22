"use client";

import * as React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { AlertCircle, RefreshCw, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorFallbackCard({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs my-4 space-y-4 animate-in fade-in-50 duration-200">
      <div className="size-12 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 flex items-center justify-center">
        <AlertCircle className="size-6 stroke-[2.2]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Unable to Load Tracking Details
        </h3>
        <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
          {message ||
            "We hit an unexpected snag fetching the latest courier status. Please try again or reach out to customer support."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 w-full max-w-xs">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs font-medium"
          onClick={() => {
            if (onRetry) onRetry();
            else if (typeof window !== "undefined") window.location.reload();
          }}
        >
          <RefreshCw className="size-3.5" />
          Retry Request
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-full gap-2 text-xs font-medium"
          onClick={() => {
            if (typeof window !== "undefined") {
              const url = new URL(window.location.href);
              url.searchParams.set("state", "processing");
              window.location.href = url.toString();
            }
          }}
        >
          <HeadphonesIcon className="size-3.5" />
          Reset to Healthy
        </Button>
      </div>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? String((error as { message: unknown }).message)
      : undefined;

  return (
    <ErrorFallbackCard
      message={errorMessage}
      onRetry={() => resetErrorBoundary()}
    />
  );
}

export function OrderErrorBoundary({
  children,
  resetKey,
}: {
  children: React.ReactNode;
  resetKey?: string;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[resetKey]}
    >
      {children}
    </ErrorBoundary>
  );
}
