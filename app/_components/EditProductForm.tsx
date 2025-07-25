"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/app/_lib/types";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { useModal } from "@/app/_context/ModalContext";

interface EditProductFormProps {
  product: Product;
  onSave: (updatedProduct: Partial<Product>, imageFile?: File) => Promise<void>;
}

export default function EditProductForm({
  product,
  onSave,
}: EditProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(product);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { handleClose } = useModal();

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Product>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      await onSave(formData, imageFile || undefined);
      handleClose(); // Close modal on success
    } catch (error) {
      console.error("Failed to save product:", error);
      // You might want to show an error message to the user here
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price || 0}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          step="0.01"
          required
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock || 0}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full mt-1 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
        {imageFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">
              New image selected: {imageFile.name}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 space-x-2 rounded-md shadow-sm transition-colors duration-200"
          style={{
            backgroundColor: "var(--accent-buttons)",
            color: "white",
            fontWeight: "bold",
          }}
          disabled={uploading}
        >
          {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
          <span>{uploading ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
