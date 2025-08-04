"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBy() {
  const options = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter");

  const router = useRouter();

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", value);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="w-full sm:w-auto">
      <span
        className="block sm:inline text-sm font-medium mb-2 sm:mb-0 sm:mr-2"
        style={{ color: "var(--text-secondary)" }}
      >
        Filter:
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            onClick={() => handleFilter(option.value)}
            key={option.value}
            className={`px-3 py-1.5 text-sm font-medium rounded-md border min-w-[80px]
             transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${
               option.value === activeFilter ? "bg-gray-700" : "bg-gray-900"
             }`}
            style={{
              borderColor:
                option.value === activeFilter
                  ? "var(--accent-buttons)"
                  : "var(--border-stroke)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--hover-focus)";
              e.currentTarget.style.borderColor = "var(--accent-buttons)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                option.value === activeFilter
                  ? "var(--hover-focus)"
                  : "var(--background)";
              e.currentTarget.style.borderColor =
                option.value === activeFilter
                  ? "var(--accent-buttons)"
                  : "var(--border-stroke)";
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
