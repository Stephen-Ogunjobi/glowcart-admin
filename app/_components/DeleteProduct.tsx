"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteProduct } from "@/app/_lib/data-services";
import { revalidateRedirect } from "@/app/_lib/action";
import { toast } from "react-hot-toast";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function DeleteProduct({ productId }: { productId: string }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleDelete() {
    const loadingToast = toast.loading("Deleting product...");

    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully", { id: loadingToast });
      revalidateRedirect(productId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product", { id: loadingToast });
    }
  }

  return (
    <>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="px-4 py-2 rounded-md transition-colors text-sm sm:text-base flex items-center justify-center space-x-2"
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <FaTrash />
        <span>Delete Product</span>
      </button>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
