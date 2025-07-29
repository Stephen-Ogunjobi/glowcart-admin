import { getOrder } from "@/app/_lib/data-services";
import { notFound } from "next/navigation";
import { Order, OrderItem } from "@/app/_lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  try {
    const order = await getOrder(orderId);

    const statusColor: Record<string, string> = {
      pending: "text-yellow-200 bg-yellow-900/50 border-yellow-700",
      processing: "text-blue-200 bg-blue-900/50 border-blue-700",
      shipped: "text-purple-200 bg-purple-900/50 border-purple-700",
      delivered: "text-green-200 bg-green-900/50 border-green-700",
      completed: "text-emerald-200 bg-emerald-900/50 border-emerald-700",
      cancelled: "text-red-200 bg-red-900/50 border-red-700",
    };

    return (
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">Order Details</h1>
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
              statusColor[order.status] ||
              "text-gray-200 bg-gray-800 border-gray-700"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Order Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Order ID: <span className="text-gray-100">#{order.id}</span>
                </p>
                <p className="text-gray-300">
                  Date:{" "}
                  <span className="text-gray-100">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-300">
                  Total Amount:{" "}
                  <span className="text-gray-100">
                    ${order.total.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Customer Information
              </h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Name: <span className="text-gray-100">{order.name}</span>
                </p>
                <p className="text-gray-300">
                  Email:{" "}
                  <span className="text-gray-100">
                    {order.users?.email || "N/A"}
                  </span>
                </p>
                <p className="text-gray-300">
                  Shipping Address:{" "}
                  <span className="text-gray-100">
                    {order.shipping_address}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Order Items
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {order.order_items?.length > 0 ? (
                  order.order_items.map((item: OrderItem) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {item.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ${item.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ${(item.quantity * item.price).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No items found for this order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading order:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    notFound();
  }
}
