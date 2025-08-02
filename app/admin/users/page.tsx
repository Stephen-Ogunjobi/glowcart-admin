import React from "react";
import UsersList from "@/app/_components/UsersList";
import Heading from "@/app/_components/Heading";

export default function page() {
  return (
    <div className="space-y-6 p-6">
      <div
        className="flex items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>All Users</Heading>
      </div>
      <UsersList />
    </div>
  );
}
