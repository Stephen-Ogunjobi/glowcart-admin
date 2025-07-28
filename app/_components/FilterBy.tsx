"use client";
import React from "react";

export default function FilterBy() {
  const options = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  return (
    <div className="flex  items-center gap-2">
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Filter:
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            className="px-3 bg-gray-900 py-1.5 text-sm font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20"
            style={{
              //   backgroundColor: "var(--background)",
              borderColor: "var(--border-stroke)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--hover-focus)";
              e.currentTarget.style.borderColor = "var(--accent-buttons)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.borderColor = "var(--border-stroke)";
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
