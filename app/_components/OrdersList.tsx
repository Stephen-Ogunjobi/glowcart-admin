import React from "react";
import { getOrders } from "@/app/_lib/data-services";
import Order from "./Order";

export default async function OrdersList() {
  const orders = await getOrders();
  return (
    <div>
      {orders.map((order) => (
        <Order order={order} key={order.id} />
      ))}
    </div>
  );
}
