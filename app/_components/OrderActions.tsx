import React from "react";
import Link from "next/link";
import { Order as OrderType } from "@/app/_lib/types";
import { FaEye, FaTrash } from "react-icons/fa";

export default function OrderActions({ order }: { order: OrderType }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/orders/${order.id}`}
        className="inline-flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20"
        style={{
          color: "var(--accent-buttons)",
          backgroundColor: "var(--background)",
          borderColor: "var(--border-stroke)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--hover-focus)";
          e.currentTarget.style.borderColor = "var(--accent-buttons)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--background)";
          e.currentTarget.style.borderColor = "var(--border-stroke)";
        }}
        title="View Order"
      >
        <FaEye className="w-3.5 h-3.5" />
      </Link>
      {order.status === "delivered" && (
        <button
          className="inline-flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20"
          style={{
            color: "#dc2626",
            backgroundColor: "var(--background)",
            borderColor: "var(--border-stroke)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fef2f2";
            e.currentTarget.style.borderColor = "#dc2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--background)";
            e.currentTarget.style.borderColor = "var(--border-stroke)";
          }}
          title="Delete Order"
        >
          <FaTrash className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
