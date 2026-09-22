"use client";

import * as React from "react";
import type { OrderData } from "@/lib/mock-data";
import { OrderStatusBanner } from "@/components/order-status-banner";
import { OrderTimeline } from "@/components/order-timeline";
import { OrderSummary } from "@/components/order-summary";
import { SupportDialog } from "@/components/support-sheet";
import { ArrowLeft, Share2, Shield, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ErrorFallbackCard } from "@/components/order-error-boundary";

interface OrderViewProps {
  order: OrderData | null;
  isError: boolean;
  stateLabel: string;
}

export function OrderView({ order, isError, stateLabel }: OrderViewProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If simulated error state
  if (isError || !order) {
    if (mounted) {
      throw new Error(
        `Courier API service unavailable for state "${stateLabel}". Simulated carrier dispatch error.`
      );
    }
    return (
      <ErrorFallbackCard
        message={`Courier API service unavailable for state "${stateLabel}". Simulated carrier dispatch error.`}
      />
    );
  }

  const isDelayed = order.status === "delayed";

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-300">
      {/* Mobile Screen Header */}
      <header className="flex items-center justify-between py-1.5 px-0.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="size-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 shadow-2xs"
            aria-label="Back to orders"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Order #{order.orderId}
            </h1>
            <p className="text-[10px] text-neutral-400 font-medium">Placed on Sep 19, 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <SupportDialog
            orderId={order.orderId}
            status={order.status}
            trigger={
              <button
                type="button"
                className="size-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 shadow-2xs"
                aria-label="Get Help"
              >
                <LifeBuoy className="size-4" />
              </button>
            }
          />
        </div>
      </header>

      {/* Primary Status Banner */}
      <OrderStatusBanner order={order} />

      {/* Vertical Delivery Timeline */}
      <OrderTimeline timeline={order.timeline} isDelayed={isDelayed} />

      {/* Order Item Details & Pricing Breakdown */}
      <OrderSummary
        orderId={order.orderId}
        items={order.items}
        total={order.total}
      />

      {/* Trust & Guarantee Badge */}
      <div className="flex items-center justify-center gap-2 py-3 text-[11px] text-neutral-400">
        <Shield className="size-3.5 text-neutral-400 shrink-0" />
        <span>Buyer Protection & Verified Delivery Guarantee</span>
      </div>
    </div>
  );
}
