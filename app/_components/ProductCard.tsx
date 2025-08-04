"use client";

import React, { useTransition, useState } from "react";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/app/_lib/data-services";
import { toast } from "react-hot-toast";
import { revalidateProducts } from "@/app/_lib/action";
import { useOptimistic } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  skin_type: string[];
  stock: number;
  image_url: string;
  deleted?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [optimisticProduct, addOptimisticProduct] = useOptimistic(
    product,
    (state: Product) => ({ ...state, deleted: true })
  );

  async function handleDelete() {
    const loadingToast = toast.loading("Deleting product...");

    startTransition(() => {
      addOptimisticProduct(product);
    });

    try {
      await deleteProduct(product.id);
      await revalidateProducts();
      toast.success("Product deleted successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to delete product", { id: loadingToast });
      window.location.reload();
    }
  }

  if (optimisticProduct.deleted) {
    return null;
  }

  const { id, name, category, price, skin_type, stock, image_url } =
    optimisticProduct;

  return (
    <>
      <div
        className="rounded-lg shadow-md p-4 flex items-center space-x-4"
        style={{ backgroundColor: "var(--sidebar)" }}
      >
        <div className="relative w-24 h-24 flex-shrink-0">
          {image_url ? (
            <Image
              src={image_url}
              alt={name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 96px) 100vw, 96px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-semibold text-text-primary">{name}</h2>
          <p className="text-sm text-text-secondary">
            Category: {category} | Skin Type: {skin_type?.join(", ") || "N/A"}
          </p>
          <p
            className="text-lg font-bold mt-2"
            style={{ color: "var(--accent-buttons)" }}
          >
            ${price.toFixed(2)}
          </p>
          <p className="text-sm text-text-secondary">In Stock: {stock}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href={`/admin/products/${id}`}
            className="px-4 py-2 rounded-md transition-colors font-medium"
            style={{ backgroundColor: "var(--accent-buttons)", color: "white" }}
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={isPending}
            className="px-4 py-2 rounded-md transition-colors font-medium relative"
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? <FaSpinner className="animate-spin" /> : <FaTrash />}
          </button>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        productName={name}
      />
    </>
  );
}
