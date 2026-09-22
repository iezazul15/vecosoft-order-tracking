# Modern Mobile Order Tracking Screen

A modern, responsive, mobile-first Order Tracking experience built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Radix UI / shadcn primitives**.

Designed to replace confusing, single-status order displays with an intuitive, transparent journey that handles standard deliveries, complex edge cases (delays, missing parcels, and pending tracking), and simulated API failures gracefully.

---

## Key Features

### 1. Interactive 14-State Evaluator Simulator

- A sticky simulator bar located at the top of the screen allows instant switching across all **14 mock states** without reloading the page or requiring a live backend.
- Grouped with visual color coding:
  - 🟢 **Standard Delivery Flow (4 States)**: Healthy progression through _Processing_, _Shipped_, _Out for Delivery_, and _Delivered_.
  - 🟡 **Required Edge Scenarios (3 States)**: Context-aware resolution screens for _Delayed Order_, _Delivered but Not Received_, and _Tracking Not Available Yet_.
  - 🔴 **Simulated Error States (7 States)**: Dedicated failure variants for every base state to evaluate the custom error boundary and retry mechanisms.
- State is synced via URL search parameters (`?state=<id>`), making specific scenarios directly linkable and bookmarkable.

### 2. The Three Required Edge Scenarios

1. **Delayed Order (`delayed`)**:
   - Immediate visual alert with an amber notice banner.
   - Original estimated delivery time is crossed out in red and flagged as overdue.
   - Courier explanation message is highlighted with a direct "Contact Courier & Support" action.
2. **Delivered but Not Received (`delivered_not_received`)**:
   - System record displays the confirmed delivery timestamp.
   - Contextual checklist guides the customer on where to check (porch, mailroom, neighbors).
   - Prominent "Report Missing Package" action opens an issue resolution form.
3. **Tracking Not Available Yet (`tracking_not_available`)**:
   - Replaces the timeline with a dedicated preparation card rather than an empty, confusing, or broken screen.
   - Reassures the customer that the order is being packed at the fulfillment center and tracking scans typically appear within 24 hours.

### 3. Vertical Delivery Timeline

- Clear typographic hierarchy with generous spacing and breathing room.
- Emerald green circular checkpoints with checkmarks for completed milestones.
- Pulsing animated badge for the active milestone with real-time description.
- Subtle muted checkpoints for upcoming steps.

### 4. Meaningful Interactions & Support Dialog

- **Support & Issue Resolution Modal**: Accessible dialog that pre-selects relevant dispute categories (missing parcel, delivery inquiry, address change) and generates a support ticket confirmation.
- **Quick Order Reference Copy**: One-tap copy to clipboard for order numbers.
- **Order & Price Breakdown**: Itemized listing with item quantities, unit prices, free shipping badge, and order totals.

### 5. Suspense & Error Boundaries

- **Suspense Loading**: State transitions simulate realistic network latency (`wait(350)`) wrapped in React `<Suspense>`, displaying an animated shimmer skeleton (`OrderSkeleton`).
- **Local Error Boundary**: Uses `react-error-boundary` within the component tree, providing an in-place recovery card with "Retry Request" and "Reset to Healthy" options.
- **Route Fallbacks**: Standalone `app/loading.tsx` and `app/error.tsx` for route-level resilience.

---

## Architecture & Principles

- **Server-First Design**: The root route (`app/page.tsx`) is an async Server Component that handles state resolution and streams components.
- **Client Leaf Components**: Interactive components (`StateSelector`, `SupportDialog`, `OrderSummary`, `OrderErrorBoundary`) are extracted as client leaf nodes (`"use client"`) to maximize performance.
- **Mobile Container**: Optimized for standard mobile screen widths (**360px – 430px**), with a centered desktop container frame for evaluator convenience.

---

## Project Structure

```text
├── app/
│   ├── error.tsx                 # Route-level error fallback
│   ├── globals.css               # Tailwind CSS theme variables & styling
│   ├── layout.tsx                # Root layout with font and metadata configuration
│   ├── loading.tsx               # Route-level loading fallback
│   └── page.tsx                  # Server component entry point with Suspense
├── components/
│   ├── ui/
│   │   └── button.tsx            # Button primitive (cva + Radix Slot)
│   ├── error-boundary.tsx        # React Error Boundary integration
│   ├── order-skeleton.tsx        # Shimmer loading skeleton
│   ├── order-status-banner.tsx   # Contextual status & warning banners
│   ├── order-summary.tsx         # Item listing, price totals & copyable order ID
│   ├── order-timeline.tsx        # Vertical delivery progress timeline
│   ├── order-view.tsx            # Main order view & client error trigger
│   ├── state-selector.tsx        # Evaluator dropdown with color badges
│   └── support-sheet.tsx         # Support & issue reporting modal dialog
├── lib/
│   ├── mock-data.ts              # 14 mock states (7 standard/edge + 7 error variants)
│   ├── utils.ts                  # Class merge utility (cn)
│   └── wait.ts                   # Simulated network latency utility
├── requirements.md               # Task requirements and specifications
└── prompts.md                    # Implementation guidelines and architectural notes
```

---

## State Reference Table

| State ID                 | Group      | Description                                                |
| :----------------------- | :--------- | :--------------------------------------------------------- |
| `processing`             | 🟢 Healthy | Order verified and packed; ETA Sep 24                      |
| `shipped`                | 🟢 Healthy | In transit with carrier sorting center; ETA Sep 23         |
| `out_for_delivery`       | 🟢 Healthy | Out with driver; ETA today by 6:00 PM                      |
| `delivered`              | 🟢 Healthy | Successfully delivered at 1:47 PM                          |
| `delayed`                | 🟡 Edge    | Overdue ETA; amber delay banner & support action           |
| `delivered_not_received` | 🟡 Edge    | Marked delivered; missing package report flow              |
| `tracking_not_available` | 🟡 Edge    | No carrier scans yet; reassuring fulfillment card          |
| `*_error` (7 states)     | 🔴 Error   | Simulated carrier API 500 failure caught by Error Boundary |

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or newer
- **pnpm**: v9 or newer (recommended)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd vecosoft-order-tracking

# Install dependencies
pnpm install
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking & Building

```bash
# Type check with TypeScript
pnpm tsc --noEmit

# Production build
pnpm build

# Start production server
pnpm start
```
