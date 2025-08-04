import React from "react";
import FilterBy from "./FilterBy";
import SortBy from "./SortBy";

export default function OrdersOperations() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <FilterBy />
      <SortBy />
    </div>
  );
}
