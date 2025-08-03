"use client";

import React from "react";

const lowStockItems = [
  {
    id: 1,
    name: "Vitamin C Serum",
    currentStock: 3,
    minStock: 10,
  },
  {
    id: 2,
    name: "Hyaluronic Acid Moisturizer",
    currentStock: 1,
    minStock: 5,
  },
  {
    id: 3,
    name: "Retinol Serum",
    currentStock: 1,
    minStock: 5,
  },
];

const AlertIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

export default function LowStockAlert() {
  return (
    <div
      className="rounded-lg border shadow-sm overflow-hidden"
      style={{
        backgroundColor: "#111827", // bg-gray-900
        borderColor: "#374151", // border-gray-700
      }}
    >
      <div className="px-6 py-4 border-b" style={{ borderColor: "#374151" }}>
        <div className="flex items-center space-x-2">
          <div className="text-yellow-400">
            <AlertIcon />
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "#f3f4f6" }} // text-gray-100
          >
            Low Stock Alert
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-900/50 text-red-200 border border-red-700">
            {lowStockItems.length} items
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{
              backgroundColor: "#1f2937", // bg-gray-800
              borderColor: "#374151", // border-gray-700
            }}
          >
            <div className="flex items-center space-x-3">
              <div>
                <h4
                  className="font-medium text-sm"
                  style={{ color: "#f3f4f6" }} // text-gray-100
                >
                  {item.name}
                </h4>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Min: {item.minStock} units
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-red-400">
                {item.currentStock} left
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Restock needed
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 border-t" style={{ borderColor: "#374151" }}>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          View all low stock items →
        </button>
      </div>
    </div>
  );
}
