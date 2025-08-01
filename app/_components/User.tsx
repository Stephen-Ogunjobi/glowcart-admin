"use client";

import { UsersType } from "@/app/_lib/types";

export default function User({ user }: { user: UsersType }) {
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
        {`${user.address.slice(0, 15)} ...`}
      </td>
    </tr>
  );
}
