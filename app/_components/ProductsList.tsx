import React from "react";
import { getProducts } from "../_lib/data-services";
import ProductCard from "./ProductCard";

export default async function ProductsList() {
  const products = await getProducts();

  return (
    <div className="space-y-4 p-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
