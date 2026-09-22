import * as React from "react";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Package,
  Truck,
  RotateCw,
  BellRing,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportDialog } from "@/components/support-sheet";
import type { OrderData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function OrderStatusBanner({ order }: { order: OrderData }) {
  const { status, estimatedDelivery, deliveredAt, supportMessage, orderId } = order;

  // 1. Delayed Order Scenario
  if (status === "delayed") {
    return (
      <div className="rounded-2xl border border-amber-200/90 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="size-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Delivery Delay Notice
              </span>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                Running Later than Expected
              </h2>
            </div>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Original ETA:</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400 line-through">
              {estimatedDelivery}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-neutral-500">Current Status:</span>
            <span className="font-medium text-amber-700 dark:text-amber-400">
              Courier Transit Delay
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
            {supportMessage}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <SupportDialog
            orderId={orderId}
            status={status}
            presetAction="delayed"
            trigger={
              <Button
                variant="default"
                size="sm"
                className="w-full text-xs font-medium h-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                Contact Courier & Support
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  // 2. Delivered but Not Received Scenario
  if (status === "delivered_not_received") {
    return (
      <div className="rounded-2xl border border-amber-200/90 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <HelpCircle className="size-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Delivery Check
              </span>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                Package Not Received?
              </h2>
            </div>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-neutral-900/80 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">System Record:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Delivered on {deliveredAt}
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
            {supportMessage}
          </p>
          <div className="text-[11px] text-neutral-500 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-lg space-y-1">
            <p className="font-medium text-neutral-700 dark:text-neutral-300">Quick check suggestions:</p>
            <ul className="list-disc list-inside text-[11px] space-y-0.5 text-neutral-600 dark:text-neutral-400">
              <li>Check porch, back door, or mailroom drop-box</li>
              <li>Ask neighbors or apartment building reception</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <SupportDialog
            orderId={orderId}
            status={status}
            presetAction="missing_package"
            trigger={
              <Button
                variant="default"
                size="sm"
                className="w-full text-xs font-medium h-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                Report Missing Package
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  // 3. Tracking Not Available Yet Scenario
  if (status === "tracking_not_available") {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/30 p-4 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center shrink-0">
            <Clock className="size-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Tracking Preparation
            </span>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
              Tracking Details Being Generated
            </h2>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-neutral-900/90 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {supportMessage}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-1 border-t border-neutral-100 dark:border-neutral-800">
            <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
            <span>Order confirmed & sent to fulfillment warehouse</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <SupportDialog
            orderId={orderId}
            status={status}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-medium h-8"
              >
                Need Help? Contact Support
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  // 4. Normal Delivery Flow (processing / shipped / out_for_delivery / delivered)
  const isDelivered = status === "delivered";
  const isOutForDelivery = status === "out_for_delivery";
  const isShipped = status === "shipped";

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-4 space-y-3 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "size-9 rounded-xl flex items-center justify-center shrink-0",
              isDelivered
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
            )}
          >
            {isDelivered && <CheckCircle2 className="size-5 stroke-[2.2]" />}
            {isOutForDelivery && <Truck className="size-5 stroke-[2]" />}
            {isShipped && <Package className="size-5 stroke-[2]" />}
            {status === "processing" && <Clock className="size-5 stroke-[2]" />}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {isDelivered ? "Final Status" : "Live Status"}
            </span>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
              {isDelivered && "Delivered Successfully"}
              {isOutForDelivery && "Out for Delivery Today"}
              {isShipped && "Shipped & In Transit"}
              {status === "processing" && "Order Placed & Processing"}
            </h2>
          </div>
        </div>

        <span
          className={cn(
            "text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 border",
            isDelivered
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
              : "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
          )}
        >
          {isDelivered ? "Delivered" : "In Progress"}
        </span>
      </div>

      <div className="p-3 bg-neutral-50/70 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] text-neutral-500">
            {isDelivered ? "Delivered On" : "Estimated Delivery"}
          </span>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {isDelivered ? deliveredAt : estimatedDelivery}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-neutral-500">Carrier</span>
          <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
            Express Delivery
          </p>
        </div>
      </div>
    </div>
  );
}
