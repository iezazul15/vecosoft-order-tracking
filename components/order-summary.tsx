"use client";

import * as React from "react";
import { Copy, Check, Package, ReceiptText, ChevronDown, ChevronUp } from "lucide-react";
import type { OrderItem } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  orderId: string;
  items: OrderItem[];
  total: number;
}

export function OrderSummary({ orderId, items, total }: OrderSummaryProps) {
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <ReceiptText className="size-4 text-neutral-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Order Details
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
          aria-label={isExpanded ? "Collapse items" : "Expand items"}
        >
          {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      {/* Order ID bar */}
      <div className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-950/70 rounded-xl border border-neutral-100 dark:border-neutral-800">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold block">
            Order Number
          </span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
            {orderId}
          </span>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={copyOrderId}
          className="gap-1 text-[11px] h-7 px-2 text-neutral-600 dark:text-neutral-400"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-600" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Item List */}
      {isExpanded && (
        <div className="space-y-3 pt-1 animate-in fade-in-50 duration-200">
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1.5 border-b border-neutral-100 dark:border-neutral-800/80 last:border-b-0 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200 leading-tight">
                      {item.name}
                    </p>
                    <span className="text-[11px] text-neutral-400">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <span className="font-medium text-neutral-900 dark:text-neutral-100 tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-neutral-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>Standard Shipping</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-neutral-900 dark:text-white pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <span>Total Paid</span>
              <span className="text-sm tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
