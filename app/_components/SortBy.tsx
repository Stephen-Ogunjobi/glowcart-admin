"use client";
import React from "react";
import { FaSort } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
  const options = [
    { value: "startDate-desc", label: "Sort by date (recent first)" },
    { value: "startDate-asc", label: "Sort by date (earlier first)" },
    {
      value: "totalPrice-desc",
      label: "Sort by amount (high first)",
    },
    { value: "totalPrice-asc", label: "Sort by amount (low first)" },
  ];

  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort");
  const router = useRouter();

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Sort:
      </span>
      <div className="relative">
        <select
          className="appearance-none bg-gray-900 pl-3 pr-10 py-1.5 text-sm font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-opacity-20"
          style={{
            borderColor: "var(--border-stroke)",
            color: "var(--text-primary)",
          }}
          onChange={handleSort}
          value={activeSort || ""}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--hover-focus)";
            e.currentTarget.style.borderColor = "var(--accent-buttons)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--background)";
            e.currentTarget.style.borderColor = "var(--border-stroke)";
          }}
        >
          <option value="">Select sorting option</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-900"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <FaSort className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
