"use client";

import { useState } from "react";
import { Order } from "@/app/_lib/types";
import { updateStatusChange } from "@/app/_lib/action";

export default function EditStatus({ order }: { order: Order }) {
  const [status, setStatus] = useState<string>("");

  function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);

    updateStatusChange(order.id.toString(), status);
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
