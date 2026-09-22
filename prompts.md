# Prompt & Conversation History

A structured log of design discussions, technical decisions, and implementation prompts for the **Mobile Order Tracking Screen**.

---

## Session 1: Planning & Architecture (Claude)

### Prompt 1: Initial Requirements & Constraints

> **User**:  
> [Pasted a screenshot of the task requirements]
>
> We are using Next.js, shadcn/ui, Tailwind CSS with TypeScript. We have to use mock data for this requirement as a backend is not necessary here.
>
> As you have the requirement context here, the application has to show in total 7 states of the order tracking: 4 previous and 3 to-do. All these states can be changed with a dropdown in the frontend for faster evaluation of the feature. Data will be inside a mock file.
>
> As we are using shadcn, with the help of the components and Lucide icons, design a nice and clean vertical timeline component which will accept the selected state from the dropdown.
>
> For the ease of evaluation, each state will have its exact error state to show in the frontend. Mostly we have to use the custom error boundary within the component JSX; thus we will have 7 × 2 = 14 states. State dropdown colors should be between red, green, yellow for easy understanding.
>
> Make a `wait` lib function for intentional loading, handle that loading with the suspense boundary within the component. Also add an `error.js` and `loading.js` file for global loading and error (although it will be less needed), but still.
>
> Don't make the whole thing at once. We will go step by step, feature by feature. Stop when one is done, then we will check and do modifications if needed and then move forward. Avoid writing spaghetti code. Write necessary codes, CSS classes only.
>
> Our theme will be monochrome, background will be white. Timeline points should be green. Design will have enough breathing space as well as maintain proper hierarchy.
>
> **Architecture to follow**: Keep most of the application server-side. If something is needed for the client side, just take that part, make another file, and import that client component into that server component. Client components as leaf nodes for the best possible performance.
>
> This is my rough implementation plan. Format it.

---

### Response 1: Implementation Plan Draft

#### Stack

- Next.js (App Router) + TypeScript
- shadcn/ui components & Radix UI primitives
- Tailwind CSS
- Lucide React for icons

#### Architecture

- **Server-first**: Keep components server-rendered by default.
- Extract to client components (`"use client"`) only when interactivity is required (state-selector dropdown, error boundary triggers, interactive modal).
- Client components sit as **leaf nodes** to maximize server-side performance.
- Clean separation of concerns with minimal, purpose-driven styling.

#### Data

- All mock data consolidated in a single mock file (`lib/mock-data.ts`).
- **7 Core Scenarios**:
  - _Standard_: Processing, Shipped, Out for Delivery, Delivered.
  - _Edge_: Delayed, Delivered but Not Received, Tracking Not Available Yet.
- **14 Total States**: 7 healthy/edge states + 7 corresponding error variants.

#### Evaluation Simulator

- A top-level dropdown allowing evaluators to pick any of the 14 states directly.
- Color-coded badges:
  - 🟢 **Green**: Healthy/standard delivery progression.
  - 🟡 **Yellow**: Warning/edge scenarios.
  - 🔴 **Red**: Simulated service/API failure states.

#### Vertical Timeline

- Clean vertical line with green checkpoints for completed/active steps.
- Active pulse animation on the current status.
- Reassuring placeholder card when tracking details are not yet generated.

#### Loading & Error Handling

- Async latency simulated via a `wait()` helper.
- React `<Suspense>` boundary paired with shimmer skeleton (`OrderSkeleton`).
- Route-level fallbacks (`app/loading.tsx`, `app/error.tsx`).
- In-component client error boundary catching simulated failures with retry capabilities.

---

### Prompt 2: Mock Data Structure

> **User**:  
> Give me the mock data.

---

### Response 2: Mock Orders Definition (`lib/mock-data.ts`)

```typescript
export type OrderStatusKey =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "delivered_not_received"
  | "tracking_not_available";

export type StateTag = "green" | "yellow" | "red";

export interface TimelineStep {
  key: OrderStatusKey;
  label: string;
  timestamp: string | null;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  orderId: string;
  status: OrderStatusKey;
  estimatedDelivery: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
  total: number;
  timeline: TimelineStep[];
  supportMessage: string | null;
}

export interface MockState {
  id: string;
  label: string;
  tag: StateTag;
  isError: boolean;
  data: OrderData | null;
}

const ITEMS: OrderItem[] = [
  { name: "Wireless Mouse", quantity: 1, price: 24.99 },
  { name: "USB-C Cable (2m)", quantity: 2, price: 9.99 },
];

const TOTAL = ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);

function buildTimeline(currentKey: OrderStatusKey): TimelineStep[] {
  const steps: { key: OrderStatusKey; label: string; time: string | null }[] = [
    { key: "processing", label: "Processing", time: "Sep 19, 9:12 AM" },
    { key: "shipped", label: "Shipped", time: "Sep 20, 2:14 PM" },
    {
      key: "out_for_delivery",
      label: "Out for Delivery",
      time: "Sep 22, 8:03 AM",
    },
    { key: "delivered", label: "Delivered", time: "Sep 22, 1:47 PM" },
  ];

  const order: OrderStatusKey[] = [
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const currentIndex = order.indexOf(currentKey);

  return steps.map((step, i) => ({
    key: step.key,
    label: step.label,
    timestamp: i <= currentIndex ? step.time : null,
    completed: i < currentIndex,
    current: i === currentIndex,
  }));
}

const baseOrders: Record<OrderStatusKey, OrderData> = {
  processing: {
    orderId: "ORD-10234",
    status: "processing",
    estimatedDelivery: "Sep 24, by 8:00 PM",
    deliveredAt: null,
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("processing"),
    supportMessage: null,
  },
  shipped: {
    orderId: "ORD-10234",
    status: "shipped",
    estimatedDelivery: "Sep 23, by 8:00 PM",
    deliveredAt: null,
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("shipped"),
    supportMessage: null,
  },
  out_for_delivery: {
    orderId: "ORD-10234",
    status: "out_for_delivery",
    estimatedDelivery: "Today, by 6:00 PM",
    deliveredAt: null,
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("out_for_delivery"),
    supportMessage: null,
  },
  delivered: {
    orderId: "ORD-10234",
    status: "delivered",
    estimatedDelivery: null,
    deliveredAt: "Today, 1:47 PM",
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("delivered"),
    supportMessage: null,
  },
  delayed: {
    orderId: "ORD-10235",
    status: "delayed",
    estimatedDelivery: "Yesterday, by 8:00 PM",
    deliveredAt: null,
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("out_for_delivery"),
    supportMessage:
      "This order is taking longer than expected. We're checking with the courier — no action needed yet, but you can contact support for an update.",
  },
  delivered_not_received: {
    orderId: "ORD-10236",
    status: "delivered_not_received",
    estimatedDelivery: null,
    deliveredAt: "Sep 21, 4:32 PM",
    items: ITEMS,
    total: TOTAL,
    timeline: buildTimeline("delivered"),
    supportMessage:
      "Marked as delivered, but let us know if it hasn't arrived — we'll help you sort it out.",
  },
  tracking_not_available: {
    orderId: "ORD-10237",
    status: "tracking_not_available",
    estimatedDelivery: null,
    deliveredAt: null,
    items: ITEMS,
    total: TOTAL,
    timeline: [],
    supportMessage:
      "Tracking details aren't available yet. This usually updates within 24 hours of your order being placed.",
  },
};

const stateMeta: Record<OrderStatusKey, { label: string; tag: StateTag }> = {
  processing: { label: "Processing", tag: "green" },
  shipped: { label: "Shipped", tag: "green" },
  out_for_delivery: { label: "Out for Delivery", tag: "green" },
  delivered: { label: "Delivered", tag: "green" },
  delayed: { label: "Delayed", tag: "yellow" },
  delivered_not_received: {
    label: "Delivered but Not Received",
    tag: "yellow",
  },
  tracking_not_available: {
    label: "Tracking Not Available Yet",
    tag: "yellow",
  },
};

export const MOCK_STATES: MockState[] = [
  ...Object.entries(baseOrders).map(([key, data]) => ({
    id: key,
    label: stateMeta[key as OrderStatusKey].label,
    tag: stateMeta[key as OrderStatusKey].tag,
    isError: false,
    data,
  })),
  ...Object.keys(baseOrders).map((key) => ({
    id: `${key}_error`,
    label: `${stateMeta[key as OrderStatusKey].label} (Error)`,
    tag: "red" as StateTag,
    isError: true,
    data: null,
  })),
];

export function getMockStateById(id: string): MockState | undefined {
  return MOCK_STATES.find((s) => s.id === id);
}
```

---

### Prompt 3: Mock Data Review & Explanation

> **User**:  
> Okay, remind me the notes a bit later, can you explain the mock data to me?

---

### Response 3: Breakdown

1. **`OrderStatusKey`**: TypeScript union covering all 7 scenarios for type safety and autocomplete.
2. **`TimelineStep`**: Milestone model driving the vertical progress steps (completed, current, upcoming).
3. **`baseOrders`**: Concrete orders representing normal flows and the 3 required edge situations.
4. **`MOCK_STATES`**: Flattened array pairing the 7 base scenarios with their 7 simulated error counterparts (14 total test states).

---

### Prompt 4: Confirmation

> **User**:  
> For now, we can keep the timestamp as string, and other 2 notice you provided earlier was okay, no issues.

---

## Session 2: Implementation & Refinement (Antigravity)

### Prompt 5: Execution Kickoff

> **User**:  
> See in the requirements.md file, you will get the implementation plan, and for the mock data, see the lib/mock-data.ts file.
>
> Start implementing and stop and ask question if you have any confusion during the implementation.

---

### Response 5: Formal Implementation Plan

_Antigravity generated the detailed implementation plan artifact covering component breakdown, Suspense boundaries, Error Boundaries, and verification criteria._

---

### Feedback & Adjustments from User

> **User Review Comments**:
>
> - Courier brand styling: Clean unbranded styling (`No` to carrier branding).
> - Additional report delivery interactions: Keep clean resolution flow (`No` to complex sub-flows).
> - Error boundary library: **"use https://www.npmjs.com/package/react-error-boundary for error boundary"**
>
> **User**:  
> "Yeah, I have added necessary modifications in the implementation plan. You may proceed now."

---

### Execution Steps Completed:

1. **Installed `react-error-boundary`**:
   - Integrated `ErrorBoundary` and `FallbackProps` into `components/order-error-boundary.tsx`.
   - Built custom `ErrorFallbackCard` with _Retry Request_ button.
2. **Created `lib/wait.ts`**:
   - Simulated async latency helper (`wait(350)`).
3. **Implemented Simulator Selector (`components/state-selector.tsx`)**:
   - Accessible dropdown displaying all 14 states with 🟢 Green, 🟡 Yellow, and 🔴 Red indicator badges.
   - Synchronized with Next.js URL query parameter (`?state=<id>`).
4. **Implemented Vertical Timeline (`components/order-timeline.tsx`)**:
   - Connected progress checkpoints, emerald completed nodes, pulsing active state, and dedicated pending dispatch card for `tracking_not_available`.
5. **Implemented Contextual Status Banners (`components/order-status-banner.tsx`)**:
   - Custom alert layouts for _Delayed_, _Delivered but Not Received_, and _Tracking Not Available Yet_.
6. **Implemented Support Dialog (`components/support-sheet.tsx`)**:
   - Interactive dialog with issue options, freeform message, and instant confirmation ticket.
7. **Implemented Order Summary (`components/order-summary.tsx`)**:
   - Collapsible product list, copyable order reference number, subtotal, and total calculation.
8. **Implemented Suspense Skeleton (`components/order-skeleton.tsx`)**:
   - Clean shimmer skeleton matching the mobile tracking layout.
9. **Configured Route Boundaries & Server Page**:
   - Added `app/loading.tsx` and `app/error.tsx`.
   - Wired `app/page.tsx` as a Server Component streaming via `<Suspense>`.
10. **Verified & Tested**:
    - `pnpm tsc --noEmit` passed with 0 errors.
    - `pnpm build` completed in 2.6s.
    - All 14 states verified on `http://localhost:3000`.

---

### Prompt 6: Git Versioning

> **User**:  
> Now put all the changes into git, you may do multiple commits.

---

### Commits Created:

- `f467b7b` — `build: add react-error-boundary, wait utility, and offline layout configuration`
- `dce0dc7` — `feat: add timeline, status banners, order summary, and simulator selector`
- `a74a007` — `feat: implement order tracking page with suspense and error boundaries`

---

### Prompt 7: Documentation Update

> **User**:  
> Now change the readme.md file as per the implementation which explains about this project clearly.

---

### Documentation Commit:

- `9ffb5b7` — `docs: update README with project overview, architecture, and state reference`
