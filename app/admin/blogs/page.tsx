import React from "react";
import Heading from "@/app/_components/Heading";
import Blogs from "@/app/_components/Blogs";

export default async function page() {
  return (
    <div className="space-y-6 pb-6">
      <div
        className="flex items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>All Blogs</Heading>
      </div>
      <Blogs />
    </div>
  );
}
