import React from "react";
import OrdersList from "@/app/_components/OrdersList";
import Heading from "@/app/_components/Heading";
import OrdersOperations from "@/app/_components/OrdersOperations";

export default function page() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>All Orders</Heading>
        <OrdersOperations />
      </div>
      <OrdersList />
    </div>
  );
}
