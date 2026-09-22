# Order Tracking Screen — Requirements & Implementation Specification

Modern, professional mobile Order Tracking experience for an e-commerce application, redesigned to make delivery progress clear at a glance, resilient against edge cases, and verifiable through an interactive simulator.

---

## 1. Overview & Problem Statement

Legacy e-commerce tracking interfaces frequently leave customers confused by only showing four bare labels (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*) without context, updated ETAs, or guidance during delivery anomalies.

This implementation redesigns the experience to provide:
- Instant clarity on delivery status at a glance.
- Real-time vertical journey with timestamps and active step indication.
- Contextual handling for delays, missing deliveries, and pending warehouse tracking.
- Interactive support channels directly embedded within the tracking interface.
- 14 interactive states (7 core scenarios + 7 error variants) driven by an evaluator dropdown.

---

## 2. Architecture & Technical Design

- **Framework**: Next.js 16 (App Router) + TypeScript + React 19.
- **Styling**: Tailwind CSS v4 + Radix UI primitives + Lucide React icons.
- **Server-First with Client Leaf Nodes**:
  - `app/page.tsx` is an async Server Component that handles route parameters and data resolution.
  - Interactive features (`StateSelector`, `SupportDialog`, `OrderSummary` copy, `OrderErrorBoundary`) are isolated into lean Client Component leaf nodes (`"use client"`).
- **Mobile Container**:
  - Optimized for mobile viewports between **360px and 430px**.
  - Centered preview layout on desktop with subtle device borders and responsive adaptation.
- **Monochrome & High-Clarity Theme**:
  - Clean neutral palette with generous breathing space and strong typographic hierarchy.
  - Emerald green accents reserved for completed timeline milestones, healthy status tags, and active pulses.
  - Amber/rose accents reserved for warnings, delays, and error boundaries.

---

## 3. Supported Scenarios (14 Total States)

All mock data is managed in `lib/mock-data.ts`. The interface supports 7 base scenarios and 7 corresponding simulated error variants:

### Standard Delivery Flow (🟢 Healthy)
1. **Processing (`processing`)**:
   - Order confirmed and verified at warehouse.
   - Timeline highlights step 1 as active with step 2–4 pending.
   - ETA displayed: *Sep 24, by 8:00 PM*.
2. **Shipped (`shipped`)**:
   - Transferred to courier sorting facility with carrier checkpoint timestamp.
   - Step 1 completed, step 2 active.
   - ETA displayed: *Sep 23, by 8:00 PM*.
3. **Out for Delivery (`out_for_delivery`)**:
   - Courier van is in transit to the delivery address.
   - Steps 1–2 completed, step 3 active with live pulse.
   - ETA displayed: *Today, by 6:00 PM*.
4. **Delivered (`delivered`)**:
   - Completed delivery with confirmed drop-off timestamp (*Today, 1:47 PM*).
   - All 4 timeline checkpoints marked with emerald checkmarks.

### Required Edge Scenarios (🟡 Warning / Action Required)
5. **Delayed Order (`delayed`)**:
   - Triggered when original ETA (*Yesterday, by 8:00 PM*) has passed.
   - Displays a prominent amber delay banner with crossed-out ETA.
   - Explains courier delay reason and offers a direct **"Contact Courier & Support"** CTA.
6. **Delivered but Not Received (`delivered_not_received`)**:
   - System indicates delivery (*Sep 21, 4:32 PM*), but package has not reached the customer.
   - Displays an action banner with physical check suggestions (porch, neighbors, mailroom).
   - Direct **"Report Missing Package"** button opening the resolution claim dialog.
7. **Tracking Not Available Yet (`tracking_not_available`)**:
   - Order exists, but courier scan details are not yet generated.
   - Avoids a broken or empty timeline by rendering a dedicated **"Pending Dispatch"** card explaining the 24-hour fulfillment window.
   - Offers customer support assistance without empty-screen degradation.

### Simulated Error Variants (🔴 Error Recovery)
8–14. **Error Variants (`*_error`)**:
   - Evaluator-selectable error states for all 7 scenarios (`processing_error`, `shipped_error`, etc.).
   - Catches service exceptions via `react-error-boundary`.
   - Displays a custom error recovery card with **"Retry Request"** and **"Reset to Healthy"** actions.

---

## 4. Key Components & Features

| Component | Path | Responsibility |
| :--- | :--- | :--- |
| **State Selector** | `components/state-selector.tsx` | Simulator dropdown with color-coded dot badges (🟢 / 🟡 / 🔴) that syncs via `?state=<id>` URL search params. |
| **Status Banner** | `components/order-status-banner.tsx` | Contextual alert cards customized for delayed orders, missing packages, unassigned tracking, or healthy deliveries. |
| **Vertical Timeline** | `components/order-timeline.tsx` | Vertical connected progress line with animated active pulses, completed checkmarks, timestamps, and empty-state placeholders. |
| **Order Summary** | `components/order-summary.tsx` | Expandable product card with 1-click clipboard order ID copy, quantity breakdown, and subtotal/shipping/tax calculation. |
| **Support Dialog** | `components/support-sheet.tsx` | Accessible modal dialog for contacting customer care or filing a delivery dispute with automatic ticket generation. |
| **Error Boundary** | `components/order-error-boundary.tsx` | Client error boundary powered by `react-error-boundary` with local retry and fallback actions. |
| **Loading Skeleton** | `components/order-skeleton.tsx` | Shimmer skeleton reflecting the layout during React Suspense state transitions. |
| **Latency Simulator** | `lib/wait.ts` | Configurable async delay simulating real-world network response latency. |

---

## 5. Verification & Submission

### Local Development & Verification
```bash
# Install dependencies
pnpm install

# Run type check
pnpm tsc --noEmit

# Run production build
pnpm build

# Start local server
pnpm dev
```

### Submission Checklist
- [x] Clear visual delivery progress and vertical timeline.
- [x] Clear current order status and estimated delivery time.
- [x] Order/product summary with item breakdown and 1-click order ID copy.
- [x] Support and delivery issue reporting flow.
- [x] Delayed Order scenario handled.
- [x] Delivered but Not Received scenario handled.
- [x] Tracking Not Available Yet scenario handled.
- [x] Loading skeleton and local error boundaries implemented.
- [x] Responsive design for 360–430px mobile widths.
- [x] Evaluator dropdown toolbar with all 14 testable states.
- [ ] Live deployed URL (to be deployed on Vercel / Cloudflare / Netlify).
- [ ] GitHub repository URL.
