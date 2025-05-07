interface Order {
  _id: string;
  userId: string;
  items: any[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactNumber: string;
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderParams {
  userId: string;
  items: any[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactNumber: string;
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  token: string;
  paymentReference?: string;
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
}

// ✅ CREATE ORDER
export async function createOrder(params: CreateOrderParams): Promise<Order> {
  const {
    userId,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    tax,
    shipping,
    total,
    token,
    paymentReference,
  } = params;

  if (!token) {
    throw new Error("Authentication token missing. Please log in to place an order.");
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        items,
        shippingAddress,
        paymentMethod,
        subtotal,
        tax,
        shipping,
        total,
        paymentReference,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create order");
    }

    const data = await response.json();
    return data.order || data; // Adjust based on your backend response
  } catch (err: any) {
    console.error("❌ Order creation failed:", err.message || err);
    throw err;
  }
}

// ✅ GET USER ORDERS
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/orders?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch user orders");
    }

    const data = await response.json();
    return data.orders || []; // Adjust based on your backend response
  } catch (err: any) {
    console.error("❌ Failed to fetch user orders:", err.message || err);
    throw err;
  }
}