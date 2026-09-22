"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { OrderStatusKey } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  FileQuestion,
  Loader2,
  MessageSquare,
  PhoneCall,
  Send,
} from "lucide-react";
import * as React from "react";

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
    if (
      presetAction === "missing_package" ||
      status === "delivered_not_received"
    ) {
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
  const [ticketId, setTicketId] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`TK-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 600);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage("");
      setTicketId(null);
    }, 300);
  };

  const issueOptions = [
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
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <MessageSquare className="size-3.5" />
            Support
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl p-5 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <DialogHeader className="pb-2 text-left">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shrink-0">
              <FileQuestion className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {status === "delivered_not_received"
                  ? "Report Delivery Issue"
                  : "Order Support"}
              </DialogTitle>
              <DialogDescription className="text-[11px] text-neutral-500">
                Ref: {orderId}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-neutral-100 dark:bg-neutral-800" />

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3 animate-in fade-in-50 duration-200">
            <div className="mx-auto size-11 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Ticket #{ticketId || "TK-Pending"} Created
              </h4>
              <p className="text-xs text-neutral-500 max-w-[260px] mx-auto leading-relaxed">
                Our delivery resolution team has received your report. We will
                reach out via SMS and email within 15 minutes.
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
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                What issue are you facing?
              </label>
              <RadioGroup
                value={selectedIssue}
                onValueChange={setSelectedIssue}
                className="gap-1.5"
              >
                {issueOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all",
                      selectedIssue === opt.id
                        ? "border-neutral-900 bg-neutral-50/80 text-neutral-900 dark:border-white dark:bg-neutral-900 dark:text-white font-medium shadow-2xs"
                        : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900",
                    )}
                  >
                    <RadioGroupItem
                      value={opt.id}
                      id={opt.id}
                      className="size-3.5"
                    />
                    <span className="truncate leading-tight">{opt.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="support-message"
                className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
              >
                Additional details (optional)
              </label>
              <Textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Checked front porch, garage, and asked neighbors..."
                rows={2}
                className="min-h-16 text-xs rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 placeholder:text-neutral-400"
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

              <Separator className="my-1 bg-neutral-100 dark:bg-neutral-800" />

              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <PhoneCall className="size-3" />
                  Urgent? Call 1-800-555-0199
                </span>
                <span className="text-[10px] text-neutral-400">
                  24/7 Available
                </span>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
