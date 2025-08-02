"use client";

import React from "react";

interface RecentOrder {
  id: number;
  created_at: string;
  status: string;
  total: number;
  name: string;
  users: {
    name: string;
    email: string;
  };
}

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

const statusColor: Record<string, string> = {
  pending: "text-yellow-200 bg-yellow-900/50 border-yellow-700",
  processing: "text-blue-200 bg-blue-900/50 border-blue-700",
  shipped: "text-purple-200 bg-purple-900/50 border-purple-700",
  delivered: "text-green-200 bg-green-900/50 border-green-700",
  completed: "text-emerald-200 bg-emerald-900/50 border-emerald-700",
  cancelled: "text-red-200 bg-red-900/50 border-red-700",
};

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="rounded-lg border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "#111827", // bg-gray-900
        borderColor: "#374151", // border-gray-700
      }}
    >
      <div className="px-6 py-4 border-b" style={{ borderColor: "#374151" }}>
        <h3
          className="text-lg font-semibold"
          style={{ color: "#f3f4f6" }} // text-gray-100
        >
          Recent Orders
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead style={{ backgroundColor: "var(--sidebar)" }}>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold tracking-wider text-right uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors duration-200 hover:bg-gray-800/50"
              >
                <td
                  className="px-6 py-4 text-sm font-medium whitespace-nowrap"
                  style={{ color: "#f3f4f6" }} // text-gray-100
                >
                  #{order.id}
                </td>
                <td
                  className="px-6 py-4 text-sm whitespace-nowrap"
                  style={{ color: "#d1d5db" }} // text-gray-300
                >
                  <div>
                    <div className="font-medium">{order.users.name}</div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {order.users.email}
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-sm whitespace-nowrap"
                  style={{ color: "#d1d5db" }} // text-gray-300
                >
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md border ${
                      statusColor[order.status] || statusColor.pending
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td
                  className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                  style={{ color: "#f3f4f6" }} // text-gray-100
                >
                  ${order.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div
          className="px-6 py-8 text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          No recent orders found
        </div>
      )}
    </div>
  );
}
