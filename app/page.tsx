import * as React from "react";
import { Suspense } from "react";
import { getMockStateById } from "@/lib/mock-data";
import { wait } from "@/lib/wait";
import { StateSelector } from "@/components/state-selector";
import { OrderErrorBoundary } from "@/components/order-error-boundary";
import { OrderView } from "@/components/order-view";
import { OrderSkeleton } from "@/components/order-skeleton";

interface PageProps {
  searchParams: Promise<{ state?: string }>;
}

async function OrderContentAsync({ stateId }: { stateId: string }) {
  // Simulate network latency for suspense loading demonstration
  await wait(350);

  const mockState = getMockStateById(stateId) || getMockStateById("processing")!;

  return (
    <OrderErrorBoundary resetKey={stateId}>
      <OrderView
        order={mockState.data}
        isError={mockState.isError}
        stateLabel={mockState.label}
      />
    </OrderErrorBoundary>
  );
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const stateId = resolvedParams.state || "processing";

  return (
    <main className="min-h-screen bg-neutral-100/50 dark:bg-neutral-950 flex flex-col items-center justify-start sm:py-8 px-0 sm:px-4">
      {/* Mobile Shell Container (optimized for 360px - 430px) */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-auto bg-white dark:bg-neutral-900/90 sm:rounded-3xl sm:border sm:border-neutral-200/80 dark:sm:border-neutral-800 sm:shadow-xl p-4 sm:p-5 flex flex-col space-y-4">
        {/* Evaluator State Selector Bar */}
        <StateSelector currentStateId={stateId} />

        {/* Suspense boundary for simulated async state changes */}
        <Suspense key={stateId} fallback={<OrderSkeleton />}>
          <OrderContentAsync stateId={stateId} />
        </Suspense>
      </div>
    </main>
  );
}
