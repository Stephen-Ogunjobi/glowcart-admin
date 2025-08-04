"use client";

import React, { useState } from "react";
import { FaTrash, FaSpinner, FaTimes } from "react-icons/fa";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  productName?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: ConfirmDeleteModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md p-6 rounded-lg shadow-2xl"
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
      >
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute text-xl leading-none text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none disabled:opacity-50"
        >
          <FaTimes />
        </button>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "#dc2626" }}
            >
              <FaTrash className="text-white text-xl" />
            </div>
          </div>

          <h3 className="mb-2 text-lg font-semibold">Confirm Delete</h3>
          <p className="mb-6 text-sm text-gray-400">
            Are you sure you want to delete{" "}
            {productName ? (
              <span className="font-medium">{productName}</span>
            ) : (
              "this product"
            )}
            ? This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 rounded-md transition-colors font-medium disabled:opacity-50"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--text-primary)",
                border: "1px solid #d1d5db",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="px-4 py-2 rounded-md transition-colors font-medium min-w-[100px] flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                opacity: isProcessing ? 0.7 : 1,
              }}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
