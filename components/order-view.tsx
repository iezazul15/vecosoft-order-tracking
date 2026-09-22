"use client";

import * as React from "react";
import { ArrowLeft, LifeBuoy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBanner } from "@/components/order-status-banner";
import { OrderTimeline } from "@/components/order-timeline";
import { OrderSummary } from "@/components/order-summary";
import { SupportDialog } from "@/components/support-sheet";
import { ErrorFallbackCard } from "@/components/order-error-boundary";
import type { OrderData } from "@/lib/mock-data";

interface OrderViewProps {
  order: OrderData | null;
  isError: boolean;
  stateLabel: string;
}

export function OrderView({ order, isError, stateLabel }: OrderViewProps) {
  // If simulated error state, render error fallback card directly without unnecessary useEffect
  if (isError || !order) {
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
          <Button
            variant="outline"
            size="icon-sm"
            className="size-8 rounded-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs"
            aria-label="Back to orders"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Order #{order.orderId}
            </h1>
            <p className="text-[10px] text-neutral-400 font-medium">
              Placed on Sep 19, 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <SupportDialog
            orderId={order.orderId}
            status={order.status}
            trigger={
              <Button
                variant="outline"
                size="icon-sm"
                className="size-8 rounded-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs"
                aria-label="Get Help"
              >
                <LifeBuoy className="size-4" />
              </Button>
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
