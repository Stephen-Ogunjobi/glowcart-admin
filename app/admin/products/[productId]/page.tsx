import EditProductSection from "@/app/_components/EditProductSection";
import { getProduct } from "@/app/_lib/data-services";
import Image from "next/image";
import Link from "next/link";
import { FaList, FaTrash } from "react-icons/fa";

export default async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProduct(productId);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div
        className="max-w-4xl mx-auto rounded-lg shadow-md overflow-hidden"
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
      >
        <h1
          className="text-2xl font-bold p-6 border-b"
          style={{ borderColor: "var(--border-stroke)" }}
        >
          Product Details
        </h1>

        <div className="md:flex p-6">
          {product.image_url ? (
            <div className="md:flex-shrink-0 mb-6 md:mb-0 md:mr-6 relative w-64 h-64">
              <Image
                className="rounded-lg object-cover"
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                priority
              />
            </div>
          ) : (
            <div className="md:flex-shrink-0 mb-6 md:mb-0 md:mr-6 w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
          <div className="flex-grow space-y-4">
            <div>
              <div
                className="uppercase tracking-wide text-sm font-semibold"
                style={{ color: "var(--accent-buttons)" }}
              >
                {product.category}
              </div>
              <h2 className="block text-xl leading-tight font-extrabold mt-1">
                {product.name}
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {product.description}
            </p>
            <p>Skin Type: {product.skin_type.join(", ")}</p>
            <p>Stock: {product.stock}</p>

            <div className="flex items-baseline">
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--accent-buttons)" }}
              >
                ${product.price}
              </span>
              <span
                className="text-sm ml-2"
                style={{ color: "var(--text-secondary)" }}
              >
                USD
              </span>
            </div>
          </div>
        </div>

        <div
          className="p-6 border-t flex justify-end space-x-4"
          style={{ borderColor: "var(--border-stroke)" }}
        >
          <EditProductSection product={product} />

          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
            style={{
              backgroundColor: "var(--text-secondary)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <FaList />
            <span>All Products</span>
          </Link>

          <button
            className="px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <FaTrash />
            <span>Delete Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
