"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/app/_lib/types";
import { useModal } from "@/app/_context/ModalContext";
import { useState, useEffect } from "react";
import { FaSpinner, FaUpload, FaImage } from "react-icons/fa";
import Image from "next/image";
import {
  createProduct,
  uploadProductImage,
  updateProduct,
} from "@/app/_lib/data-services";
import { revalidateProducts } from "@/app/_lib/action";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Custom type for the form data
interface FormInputs {
  name: string;
  category: string;
  price: number;
  skin_type: string[];
  description: string;
  stock: number;
  image: FileList | null;
}

// Schema for client-side validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "category is required" }),
  price: z.number().refine((val) => !isNaN(val) && val > 0, {
    message: "Price must be a number greater than 0",
  }),
  skin_type: z
    .array(z.string())
    .nonempty({ message: "Select at least one skin type" }),
  description: z.string().min(1, { message: "description is required" }),
  stock: z.number().refine((val) => !isNaN(val) && val >= 0, {
    message: "Stock must be a valid number",
  }),
  image: z.any(),
});

const SKIN_TYPES = [
  { value: "normal", label: "Normal" },
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
  { value: "all", label: "All" },
];

type NewProduct = Omit<Product, "id" | "created_at">;

export default function NewProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const { handleClose } = useModal();
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile?.[0]) {
      const file = imageFile[0];

      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size must be less than 5MB");
        return;
      }

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setFileError("Only .jpg, .jpeg, .png and .webp formats are supported");
        return;
      }

      setFileError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFileError(null);
    }
  }, [imageFile]);

  async function onSubmit(data: FormInputs) {
    if (!data.image?.[0]) {
      setFileError("Image is required");
      return;
    }

    if (fileError) {
      return;
    }

    setIsUploading(true);

    try {
      const newProduct: NewProduct = {
        name: data.name,
        category: data.category,
        price: data.price,
        skin_type: data.skin_type,
        description: data.description,
        stock: data.stock,
        image_url: "uploading...", // temporary placeholder
      };

      const createdProduct = await createProduct(newProduct as Product);

      try {
        // Upload the image using the new product's ID
        const imageUrl = await uploadProductImage(
          data.image[0],
          createdProduct.id
        );

        // Update the product with the image URL
        await updateProduct({
          id: createdProduct.id,
          image_url: imageUrl,
        });

        handleClose();
        await revalidateProducts();
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        setFileError("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setFileError("Error creating product. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 pb-20 md:pb-16">
        <div className="space-y-6">
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
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
                  {...register("name")}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
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
                  {...register("price", { valueAsNumber: true })}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  step="0.01"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
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
                  {...register("stock", { valueAsNumber: true })}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
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
                  {...register("category")}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-4 md:px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-gray-500 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative w-full h-32 mb-4">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={200}
                          height={128}
                          className="mx-auto h-full object-contain rounded-md"
                        />
                      </div>
                    ) : (
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex flex-col md:flex-row text-sm text-gray-400 items-center justify-center space-y-2 md:space-y-0">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-500 hover:text-indigo-400 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          {...register("image")}
                        />
                      </label>
                      <p className="md:pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message as string}
                  </p>
                )}
                {fileError && (
                  <p className="text-red-500 text-xs mt-1">{fileError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Full width fields */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Skin Types Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skin Types
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKIN_TYPES.map((type) => (
                <label key={type.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={type.value}
                    {...register("skin_type")}
                    className="rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">{type.label}</span>
                </label>
              ))}
            </div>
            {errors.skin_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.skin_type.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fixed button group at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-end px-4 py-3 space-x-4 border-t border-gray-600 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
          style={{
            backgroundColor: "var(--accent-buttons)",
            color: "white",
            opacity: isSubmitting || isUploading ? 0.7 : 1,
          }}
        >
          {isSubmitting || isUploading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaUpload />
          )}
          <span>
            {isSubmitting || isUploading ? "Saving..." : "Save Changes"}
          </span>
        </button>
      </div>
    </form>
  );
}
