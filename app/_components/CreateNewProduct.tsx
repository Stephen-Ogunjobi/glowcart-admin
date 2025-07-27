"use client";
import React from "react";
import { useModal } from "@/app/_context/ModalContext";
import Modal from "@/app/_components/Modal";
import NewProductForm from "@/app/_components/NewProductForm";
import { FaPlus } from "react-icons/fa";

export default function CreateNewProduct() {
  const { handleOpen } = useModal();

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center px-4 py-2 space-x-2 rounded-md shadow-md transition-all duration-200 hover:shadow-lg"
        style={{
          backgroundColor: "var(--accent-buttons)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <FaPlus />
        <span>Create New Product</span>
      </button>
      <Modal>
        <div className="space-y-4">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Create New Product
          </h2>
          <NewProductForm />
        </div>
      </Modal>
    </>
  );
}
