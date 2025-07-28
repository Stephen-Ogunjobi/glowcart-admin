import React from "react";
import ProductsList from "../../_components/ProductsList";
import Heading from "@/app/_components/Heading";

export default function page() {
  return (
    <div className="space-y-6 pb-6">
      <div
        className="flex items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>All Products</Heading>
      </div>
      <div>
        <ProductsList />
      </div>
    </div>
  );
}
