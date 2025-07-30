import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { Product, Order } from "@/app/_lib/types";

export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error("Products could not be loaded");
  }

  return products;
}

export async function getProduct(id: string) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return product;
}

export async function createProduct(product: Product) {
  const { data: newProduct, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    throw new Error("Product could not be created");
  }

  return newProduct;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error("Product could not be deleted");
  }
}

export async function updateProduct(product: Partial<Product>) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id)
    .select()
    .single();

  if (error) {
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

  const { error: uploadError } = await supabase.storage
    .from("products-images")
    .upload(filePath, imageFile);

  if (uploadError) {
    throw new Error("Image could not be uploaded");
  }

  // Get a signed URL with a long expiration (e.g., 1 year)
  const { data: signedData, error: signError } = await supabase.storage
    .from("products-images")
    .createSignedUrl(filePath, 365 * 24 * 60 * 60); // 1 year in seconds

  if (signError) {
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
      throw new Error("Invalid image URL format");
    }
    const filePath = matches[1];

    const { error } = await supabase.storage
      .from("products-images")
      .remove([filePath]);

    if (error) {
      throw new Error("Image could not be deleted");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing image deletion");
  }
}

export async function getOrders(sortBy?: string) {
  let query = supabase.from("orders").select("*");

  if (sortBy) {
    const [field, direction] = sortBy.split("-");
    // Map the sort fields from the UI to the database columns
    const sortField =
      field === "startDate"
        ? "created_at"
        : field === "totalPrice"
        ? "total"
        : "created_at"; // default sort

    query = query.order(sortField, { ascending: direction === "asc" });
  } else {
    // Default sort by created_at desc if no sort specified
    query = query.order("created_at", { ascending: false });
  }

  const { data: orders, error } = await query;

  if (error) {
    throw new Error("Orders could not be loaded");
  }

  return orders;
}

export async function getOrder(id: string): Promise<Order> {
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(
        id,
        quantity,
        products(
          id,
          name,
          price
        )
      ),
      users!orders_customer_id_fkey(*)
    `
    )
    .eq("id", numericId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      notFound();
    }
    throw new Error(`Order could not be loaded: ${error.message}`);
  }

  if (!order) {
    notFound();
  }

  return order;
}

export async function getOrderItems(id: string) {
  const { data: orderItems, error } = await supabase
    .from("order_items")
    .select(
      `
  id,
  quantity,
  product:products(name, price)`
    )
    .eq("order_id", id);

  if (error) {
    throw new Error("Order items could not be loaded");
  }
  return orderItems;
}

export async function updateOrderStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Order status could not be updatated");
  }
  return data;
}
