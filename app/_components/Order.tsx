"use client";
import React from "react";
import { Order as OrderType } from "@/app/_lib/types";
import OrderActions from "./OrderActions";

const statusColor: Record<string, string> = {
  pending: "text-yellow-200 bg-yellow-900/50 border-yellow-700",
  processing: "text-blue-200 bg-blue-900/50 border-blue-700",
  shipped: "text-purple-200 bg-purple-900/50 border-purple-700",
  delivered: "text-green-200 bg-green-900/50 border-green-700",
  completed: "text-emerald-200 bg-emerald-900/50 border-emerald-700",
  cancelled: "text-red-200 bg-red-900/50 border-red-700",
};

export default function Order({ order }: { order: OrderType }) {
  return (
    <tr
      className="transition-colors duration-200"
      style={{
        backgroundColor: "#111827", // bg-gray-900
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1f2937"; // bg-gray-800
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#111827"; // bg-gray-900
      }}
    >
      <td
        className="px-6 py-4 text-sm font-medium whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        #{order.id}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        {order.name}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        ${order.total.toLocaleString()}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        {new Date(order.created_at).toLocaleDateString()}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap border-r"
        style={{ borderColor: "#374151" }} // border-gray-700
      >
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            statusColor[order.status] ||
            "text-gray-200 bg-gray-800 border-gray-700"
          }`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderActions order={order} />
      </td>
    </tr>
  );
}
