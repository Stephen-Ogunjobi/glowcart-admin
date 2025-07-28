import React from "react";
import { getOrders } from "@/app/_lib/data-services";
import Order from "./Order";

export default async function OrdersList() {
  const orders = await getOrders();
  return (
    <div
      className="w-full overflow-hidden rounded-lg border shadow-sm"
      style={{
        borderColor: "#374151", // border-gray-700
        backgroundColor: "#111827", // bg-gray-900
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead style={{ backgroundColor: "var(--sidebar)" }}>
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase border-r"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "#374151", // border-gray-700
                }}
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y divide-gray-700/50"
            style={{
              backgroundColor: "#111827", // bg-gray-900
              borderColor: "#374151", // border-gray-700
            }}
          >
            {orders.map((order) => (
              <Order order={order} key={order.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
