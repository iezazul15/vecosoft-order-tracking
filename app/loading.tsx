import { OrderSkeleton } from "@/components/order-skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 space-y-4">
      <div className="h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
      <OrderSkeleton />
    </div>
  );
}
