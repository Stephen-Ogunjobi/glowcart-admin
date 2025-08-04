"use client";

import { UsersType } from "@/app/_lib/types";

interface UserProps {
  user: UsersType;
  view: "table" | "card";
}

export default function User({ user, view }: UserProps) {
  if (view === "card") {
    return (
      <div
        className="p-4 transition-colors duration-200"
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
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm font-medium" style={{ color: "#f3f4f6" }}>
                {user.name}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                ID: {user.id}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col text-sm" style={{ color: "#f3f4f6" }}>
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Email
              </span>
              {user.email}
            </div>
            <div className="flex flex-col text-sm" style={{ color: "#f3f4f6" }}>
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Phone
              </span>
              {user.phone_number}
            </div>
            <div className="flex flex-col text-sm" style={{ color: "#f3f4f6" }}>
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Address
              </span>
              {user.address}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        {user.id}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        {user.name}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        {user.email}
      </td>
      <td
        className="px-6 py-4 text-sm whitespace-nowrap border-r"
        style={{
          color: "#f3f4f6", // text-gray-100
          borderColor: "#374151", // border-gray-700
        }}
      >
        {user.phone_number}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap border-r"
        style={{ borderColor: "#374151" }} // border-gray-700
      >
        {`${user.address.slice(0, 30)}${user.address.length > 30 ? "..." : ""}`}
      </td>
    </tr>
  );
}
