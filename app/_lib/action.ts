"use server";
import { revalidatePath } from "next/cache";
import { Product, CreateBlogInput } from "@/app/_lib/types";
import {
  updateProduct,
  uploadProductImage,
  deleteProductImage,
  updateOrderStatus,
  createSaveBlog,
  uploadBlogImage,
  updateBlog,
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

export async function revalidateBlogs() {
  revalidatePath("/admin/blogs");
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

export async function createBlogAction(
  form: CreateBlogInput,
  imageFile?: File
) {
  const { data } = await createSaveBlog(form);

  let cover_image = form.cover_image;
  if (imageFile) {
    cover_image = await uploadBlogImage(imageFile, String(data.id));
    await updateBlog(data.id, { cover_image });
  }

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}
