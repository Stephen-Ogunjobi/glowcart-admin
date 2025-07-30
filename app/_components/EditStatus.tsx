"use client";

import { useState } from "react";
import { Order } from "@/app/_lib/types";
import { updateStatusChange } from "@/app/_lib/action";

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
    <select name="" id="" value={status} onChange={handleStatus}>
      <option value="">Edit Status</option>
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  );
}
