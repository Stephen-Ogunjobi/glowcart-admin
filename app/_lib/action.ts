"use server";
import { revalidatePath } from "next/cache";
import { Product } from "@/app/_lib/types";
import {
  updateProduct,
  uploadProductImage,
  deleteProductImage,
  updateOrderStatus,
} from "./data-services";
import { redirect } from "next/navigation";

export async function CreateUpdateData(
  updatedProduct: Partial<Product>,
  imageFile?: File
) {
  const finalUpdatedProduct = { ...updatedProduct };

  if (imageFile && updatedProduct.id) {
    try {
      if (updatedProduct.image_url) {
        await deleteProductImage(updatedProduct.image_url);
      }

      const newImageUrl = await uploadProductImage(
        imageFile,
        updatedProduct.id
      );

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

export async function updateStatusChange(id: string, status: string) {
  const data = await updateOrderStatus(id, status);

  revalidatePath(`/admin/orders/${id}`);

  return data;
}
