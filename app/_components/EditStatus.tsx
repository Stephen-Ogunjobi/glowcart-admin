"use client";

import { useState } from "react";
import { Order } from "@/app/_lib/types";
import { updateStatusChange } from "@/app/_lib/action";
import { FaSort } from "react-icons/fa";

export default function EditStatus({ order }: { order: Order }) {
  const [status, setStatus] = useState<string>(order.status);

  function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus) {
      updateStatusChange(order.id.toString(), newStatus);
    }
  }
  return (
    <div className="relative">
      <select
        className="appearance-none  pl-3 pr-10 py-1.5 text-sm font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-opacity-20"
        // style={{
        //   borderColor: "var(--border-stroke)",
        //   color: "var(--text-primary)",
        // }}
        value={status}
        onChange={handleStatus}
      >
        <option
          value="pending"
          className="bg-gray-900"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Pending
        </option>
        <option
          value="processing"
          className="bg-gray-900"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Processing
        </option>
        <option
          value="shipped"
          className="bg-gray-900"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Shipped
        </option>
        <option
          value="delivered"
          className="bg-gray-900"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Delivered
        </option>
      </select>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <FaSort className="w-3 h-3" />
      </div>
    </div>
  );
}
