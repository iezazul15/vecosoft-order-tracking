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

// ---- Shared item set ----
const ITEMS: OrderItem[] = [
  { name: "Wireless Mouse", quantity: 1, price: 24.99 },
  { name: "USB-C Cable (2m)", quantity: 2, price: 9.99 },
];

const TOTAL = ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);

// ---- Helper to build a base timeline ----
function buildTimeline(currentKey: OrderStatusKey): TimelineStep[] {
  const steps: {
    key: OrderStatusKey;
    label: string;
    time: string | null;
  }[] = [
    {
      key: "processing",
      label: "Processing",
      time: "Sep 19, 9:12 AM",
    },
    {
      key: "shipped",
      label: "Shipped",
      time: "Sep 20, 2:14 PM",
    },
    {
      key: "out_for_delivery",
      label: "Out for Delivery",
      time: "Sep 22, 8:03 AM",
    },
    {
      key: "delivered",
      label: "Delivered",
      time: "Sep 22, 1:47 PM",
    },
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

// ---- The 7 base states ----
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

// ---- Dropdown labels + color tags ----
const stateMeta: Record<OrderStatusKey, { label: string; tag: StateTag }> = {
  processing: {
    label: "Processing",
    tag: "green",
  },
  shipped: {
    label: "Shipped",
    tag: "green",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    tag: "green",
  },
  delivered: {
    label: "Delivered",
    tag: "green",
  },
  delayed: {
    label: "Delayed",
    tag: "yellow",
  },
  delivered_not_received: {
    label: "Delivered but Not Received",
    tag: "yellow",
  },
  tracking_not_available: {
    label: "Tracking Not Available Yet",
    tag: "yellow",
  },
};

// ---- Final export: 7 normal + 7 error states ----
export const MOCK_STATES: MockState[] = [
  ...(Object.entries(baseOrders) as [OrderStatusKey, OrderData][]).map(
    ([key, data]) => ({
      id: key,
      label: stateMeta[key].label,
      tag: stateMeta[key].tag,
      isError: false,
      data,
    }),
  ),

  ...(Object.keys(baseOrders) as OrderStatusKey[]).map((key) => ({
    id: `${key}_error`,
    label: `${stateMeta[key].label} (Error)`,
    tag: "red" as StateTag,
    isError: true,
    data: null,
  })),
];

// ---- Lookup helper ----
export function getMockStateById(id: string): MockState | undefined {
  return MOCK_STATES.find((state) => state.id === id);
}
