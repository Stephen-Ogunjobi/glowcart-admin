"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";
import { useModal } from "@/app/_context/ModalContext";

export default function EditButton() {
  const { handleOpen } = useModal();
  return (
    <button
      className="px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
      style={{
        backgroundColor: "var(--accent-buttons)",
        color: "white",
        fontWeight: "bold",
      }}
      onClick={handleOpen}
    >
      <FaEdit />
      <span>Edit Product</span>
    </button>
  );
}
