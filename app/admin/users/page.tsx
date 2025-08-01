import React from "react";
import { getUsers } from "@/app/_lib/data-services";

export default async function page() {
  const users = await getUsers();
  return (
    <div>
      <p>Users</p>
    </div>
  );
}
