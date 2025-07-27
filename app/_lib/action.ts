"use server";
import { revalidatePath } from "next/cache";
import { Product } from "@/app/_lib/types";
import {
  updateProduct,
  uploadProductImage,
  deleteProductImage,
} from "./data-services";
import { redirect } from "next/navigation";

export async function CreateUpdateData(
  updatedProduct: Partial<Product>,
  imageFile?: File
) {
  const finalUpdatedProduct = { ...updatedProduct };

  if (imageFile && updatedProduct.id) {
    try {
      // If there's an existing image, delete it first
      if (updatedProduct.image_url) {
        await deleteProductImage(updatedProduct.image_url);
      }

      // Upload the new image
      const newImageUrl = await uploadProductImage(
        imageFile,
        updatedProduct.id
      );

      // Add the new image URL to the product data
      finalUpdatedProduct.image_url = newImageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload image");
    }
  }

  const result = await updateProduct(finalUpdatedProduct);

  revalidatePath(`/admin/products/${updatedProduct.id}`);

  return result;
}

export async function revalidateProducts() {
  revalidatePath("/admin/products");
}

export async function revalidateRedirect(id: string) {
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
