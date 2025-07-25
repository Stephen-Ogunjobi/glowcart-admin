import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { Product } from "@/app/_lib/types";

export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.log(error);
    throw new Error("products could not be loaded");
  }

  return products;
}

export async function getProduct(id: string) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  console.log("fetching products");

  if (error) {
    console.log(error);
    notFound();
  }

  return product;
}

export async function updateProduct(product: Partial<Product>) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Product could not be updated");
  }
  return data;
}

export async function uploadProductImage(
  imageFile: File,
  productId: string
): Promise<string> {
  const fileExt = imageFile.name.split(".").pop();
  const fileName = `${productId}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  // Upload the file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("products-images")
    .upload(filePath, imageFile);

  if (uploadError) {
    console.log("Upload error:", uploadError);
    throw new Error("Image could not be uploaded");
  }

  // Get a signed URL with a long expiration (e.g., 1 year)
  const { data: signedData, error: signError } = await supabase.storage
    .from("products-images")
    .createSignedUrl(filePath, 365 * 24 * 60 * 60); // 1 year in seconds

  if (signError) {
    console.log("Signed URL error:", signError);
    throw new Error("Could not generate signed URL");
  }

  return signedData.signedUrl;
}

export async function deleteProductImage(image_url: string) {
  try {
    // Extract the file path from the URL
    // The URL will be like: https://xxx.supabase.co/storage/v1/object/public/products-images/filename.jpg
    const matches = image_url.match(/products-images\/(.+)$/);
    if (!matches) {
      console.log("Could not extract file path from URL:", image_url);
      return;
    }
    const filePath = matches[1];

    const { error } = await supabase.storage
      .from("products-images")
      .remove([filePath]);

    if (error) {
      console.log("Delete error:", error);
    }
  } catch (error) {
    console.log("Error processing delete:", error);
  }
}
