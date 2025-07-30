"use client";

import { useState } from "react";

export default function EditStatus() {
  const [status, setStatus] = useState<string>("");

  function handleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value);
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
