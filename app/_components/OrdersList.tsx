"use client";

import { getOrders } from "@/app/_lib/data-services";
import { Order as OrderType } from "@/app/_lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Order from "./Order";

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders(activeSort || undefined);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrders();
  }, [activeSort]);

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
