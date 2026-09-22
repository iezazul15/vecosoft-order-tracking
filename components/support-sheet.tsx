"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import {
  X,
  MessageSquare,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  FileQuestion,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OrderStatusKey } from "@/lib/mock-data";

interface SupportSheetProps {
  orderId: string;
  status: OrderStatusKey;
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  presetAction?: "general" | "missing_package" | "delayed";
}

export function SupportDialog({
  orderId,
  status,
  trigger,
  presetAction = "general",
}: SupportSheetProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIssue, setSelectedIssue] = React.useState<string>(() => {
    if (presetAction === "missing_package" || status === "delivered_not_received") {
      return "not_received";
    }
    if (presetAction === "delayed" || status === "delayed") {
      return "delayed_inquiry";
    }
    return "general_help";
  });
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage("");
    }, 300);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <MessageSquare className="size-3.5" />
            Support
          </Button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-in fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 shadow-2xl animate-in zoom-in-95 fade-in-0 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                <FileQuestion className="size-4" />
              </div>
              <div>
                <Dialog.Title className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {status === "delivered_not_received"
                    ? "Report Delivery Issue"
                    : "Order Support"}
                </Dialog.Title>
                <Dialog.Description className="text-[11px] text-neutral-500">
                  Ref: {orderId}
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                onClick={handleClose}
                className="size-7 rounded-lg inline-flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>

          {isSubmitted ? (
            <div className="py-6 text-center space-y-3 animate-in fade-in-50 duration-200">
              <div className="mx-auto size-11 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Ticket #TK-{Math.floor(1000 + Math.random() * 9000)} Created
                </h4>
                <p className="text-xs text-neutral-500 max-w-[260px] mx-auto leading-relaxed">
                  Our delivery resolution team has received your report. We will reach
                  out via SMS and email within 15 minutes.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  onClick={handleClose}
                  className="w-full text-xs h-8 font-medium"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-3 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  What issue are you facing?
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    {
                      id: "not_received",
                      label: "Order marked delivered, but not received",
                    },
                    {
                      id: "delayed_inquiry",
                      label: "Delivery is delayed / past estimated date",
                    },
                    {
                      id: "change_address",
                      label: "Need to update delivery instructions",
                    },
                    {
                      id: "general_help",
                      label: "General question about this order",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all",
                        selectedIssue === opt.id
                          ? "border-neutral-900 bg-neutral-50/80 text-neutral-900 dark:border-white dark:bg-neutral-900 dark:text-white font-medium shadow-xs"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      )}
                    >
                      <input
                        type="radio"
                        name="issueType"
                        value={opt.id}
                        checked={selectedIssue === opt.id}
                        onChange={(e) => setSelectedIssue(e.target.value)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "size-3 rounded-full border flex items-center justify-center shrink-0",
                          selectedIssue === opt.id
                            ? "border-neutral-900 dark:border-white bg-neutral-900 dark:bg-white"
                            : "border-neutral-300 dark:border-neutral-600"
                        )}
                      >
                        {selectedIssue === opt.id && (
                          <span className="size-1 rounded-full bg-white dark:bg-neutral-900" />
                        )}
                      </span>
                      <span className="truncate">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Additional details (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Checked front porch, garage, and asked neighbors..."
                  rows={2}
                  className="w-full text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-8 text-xs font-medium gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Submitting report...
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      Submit Resolution Request
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <PhoneCall className="size-3" />
                    Urgent? Call 1-800-555-0199
                  </span>
                  <span className="text-[10px] text-neutral-400">24/7 Available</span>
                </div>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
