import React from "react";
import { getBlog } from "@/app/_lib/data-services";
import { notFound } from "next/navigation";
import Heading from "@/app/_components/Heading";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  try {
    const blog = await getBlog(parseInt(blogId));

    return (
      <div className="space-y-6 pb-6">
        <div
          className="flex items-center justify-between p-4 rounded-lg border"
          style={{
            backgroundColor: "var(--sidebar)",
            borderColor: "var(--border-stroke)",
          }}
        >
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/blogs"
              className="flex items-center px-3 py-2 rounded-md transition-colors font-medium"
              style={{
                backgroundColor: "var(--accent-buttons)",
                color: "white",
              }}
              title="Back to Blogs"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </Link>
            <Heading>Blog Details</Heading>
          </div>
        </div>

        <div
          className="rounded-lg border p-6 space-y-4"
          style={{
            backgroundColor: "var(--sidebar)",
            borderColor: "var(--border-stroke)",
          }}
        >
          <div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {blog.title}
            </h1>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              By {blog.author}
            </p>
          </div>

          {blog.cover_image && (
            <div className="mb-4">
              <div className="relative w-full max-w-md h-48">
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 448px) 100vw, 448px"
                />
              </div>
            </div>
          )}

          <div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Excerpt
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>{blog.excerpt}</p>
          </div>

          <div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Content
            </h3>
            <div
              className="prose prose-sm max-w-none"
              style={{ color: "var(--text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: "var(--border-stroke)" }}
          >
            <span
              className="text-xs font-medium px-3 py-1 rounded"
              style={{
                backgroundColor: blog.published ? "#065f46" : "#374151",
                color: "white",
              }}
            >
              {blog.published ? "Published" : "Draft"}
            </span>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Slug: {blog.slug}
            </p>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
