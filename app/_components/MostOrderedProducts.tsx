"use client";

import React from "react";

// Hardcoded most ordered products for visual demonstration
const mostOrderedProducts = [
  {
    id: 1,
    name: "Retinol Night Cream",
    orders: 127,
    revenue: 3810,
    trend: "+12%",
  },
  {
    id: 2,
    name: "Niacinamide Face Serum",
    orders: 94,
    revenue: 2820,
    trend: "+8%",
  },
  {
    id: 3,
    name: "SPF 50 Sunscreen",
    orders: 78,
    revenue: 2340,
    trend: "+5%",
  },
];

const TrendingUpIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const StarIcon = () => (
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
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export default function MostOrderedProducts() {
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
            <StarIcon />
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "#f3f4f6" }} // text-gray-100
          >
            Most Ordered Products
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900/50 text-green-200 border border-green-700">
            Top 3
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {mostOrderedProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 rounded-lg border"
            style={{
              backgroundColor: "#1f2937", // bg-gray-800
              borderColor: "#374151", // border-gray-700
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    index === 0
                      ? "#fbbf24"
                      : index === 1
                      ? "#9ca3af"
                      : "#cd7c2f",
                  color: "#111827",
                }}
              >
                {index + 1}
              </div>

              <div>
                <h4
                  className="font-medium text-sm"
                  style={{ color: "#f3f4f6" }} // text-gray-100
                >
                  {product.name}
                </h4>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {product.orders} orders
                </p>
              </div>
            </div>
            <div className="text-right">
              <div
                className="text-sm font-semibold"
                style={{ color: "#f3f4f6" }} // text-gray-100
              >
                ${product.revenue.toLocaleString()}
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-green-400 text-xs">{product.trend}</span>
                <div className="text-green-400">
                  <TrendingUpIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 border-t" style={{ borderColor: "#374151" }}>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          View all products →
        </button>
      </div>
    </div>
  );
}
