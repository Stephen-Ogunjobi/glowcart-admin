"use client";

import React, { useTransition, useState } from "react";
import { FaEye, FaTrash, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { deleteBlog } from "@/app/_lib/data-services";
import { toast } from "react-hot-toast";
import { revalidateBlogs } from "@/app/_lib/action";
import { useOptimistic } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { BlogType } from "@/app/_lib/types";

interface BlogCardProps {
  blog: BlogType & { deleted?: boolean };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [optimisticBlog, addOptimisticBlog] = useOptimistic(
    blog,
    (state: BlogType & { deleted?: boolean }) => ({ ...state, deleted: true })
  );

  async function handleDelete() {
    const loadingToast = toast.loading("Deleting blog...");

    startTransition(() => {
      addOptimisticBlog(blog);
    });

    try {
      await deleteBlog(blog.id);
      await revalidateBlogs();
      toast.success("Blog deleted successfully", { id: loadingToast });
    } catch {
      toast.error("Failed to delete blog", { id: loadingToast });
      window.location.reload();
    }
  }

  if (optimisticBlog.deleted) {
    return null;
  }

  return (
    <>
      <div
        className="rounded-lg border p-4"
        style={{
          borderColor: "var(--border-stroke)",
          backgroundColor: "var(--sidebar)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {optimisticBlog.title}
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {optimisticBlog.excerpt}
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              By {optimisticBlog.author}
            </p>
          </div>

          <div className="flex flex-col items-end space-y-3">
            <div className="flex items-center space-x-2">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border"
                style={{
                  backgroundColor: optimisticBlog.published
                    ? "#dcfce7"
                    : "#f3f4f6",
                  color: optimisticBlog.published ? "#166534" : "#374151",
                  borderColor: optimisticBlog.published ? "#bbf7d0" : "#d1d5db",
                }}
              >
                {optimisticBlog.published ? "● Published" : "○ Draft"}
              </span>
            </div>

            <div className="flex space-x-2">
              <Link
                href={`/admin/blogs/${optimisticBlog.id}`}
                className="px-3 py-2 rounded-md transition-colors font-medium flex items-center hover:opacity-90"
                style={{
                  backgroundColor: "var(--accent-buttons)",
                  color: "white",
                }}
                title="View Blog"
              >
                <FaEye />
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isPending}
                className="px-3 py-2 rounded-md transition-colors font-medium relative flex items-center hover:opacity-90"
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  opacity: isPending ? 0.7 : 1,
                }}
                title="Delete Blog"
              >
                {isPending ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        productName={optimisticBlog.title}
        itemType="blog"
      />
    </>
  );
}
