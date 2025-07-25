"use client";
import React from "react";
import EditButton from "./EditButton";
import Modal from "./Modal";
import EditProductForm from "./EditProductForm";
import { Product } from "@/app/_lib/types";
import { CreateUpdateData } from "@/app/_lib/action";
import { useModal } from "@/app/_context/ModalContext";

interface EditProductSectionProps {
  product: Product;
}

export default function CreateEditProduct({
  product,
}: EditProductSectionProps) {
  const { handleClose } = useModal();

  async function handleSave(
    updatedProduct: Partial<Product>,
    imageFile?: File
  ): Promise<void> {
    try {
      await CreateUpdateData(updatedProduct, imageFile);
    } catch (error) {
      console.log(error);
      throw error;
    }
    handleClose();
  }

  return (
    <>
      <EditButton />
      <Modal>
        <EditProductForm product={product} onSave={handleSave} />
      </Modal>
    </>
  );
}
