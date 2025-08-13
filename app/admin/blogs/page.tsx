import React from "react";
import Heading from "@/app/_components/Heading";
import Link from "next/link";
import { getBlogs } from "@/app/_lib/data-services";
import { BlogType } from "@/app/_lib/types";

export default async function page() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6 pb-6">
      <div
        className="flex items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>All Blogs</Heading>
        <Link
          href="/admin/blogs/new"
          className="px-4 py-2 rounded-md text-sm sm:text-base transition-colors"
          style={{
            backgroundColor: "var(--accent-buttons)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Create New Blog
        </Link>
      </div>

      {!blogs || blogs.length === 0 ? (
        <div
          className="rounded-lg border p-8 text-center"
          style={{
            borderColor: "var(--border-stroke)",
            backgroundColor: "var(--sidebar)",
          }}
        >
          <p style={{ color: "var(--text-secondary)" }}>No blogs found.</p>
          <div className="mt-4">
            <Link
              href="/admin/blogs/new"
              className="inline-block px-4 py-2 rounded-md shadow-md transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: "var(--accent-buttons)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Create New Blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog: BlogType) => (
            <div
              key={blog.id}
              className="rounded-lg border p-4"
              style={{
                borderColor: "var(--border-stroke)",
                backgroundColor: "var(--sidebar)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {blog.excerpt}
                  </p>
                </div>
                <span
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{
                    backgroundColor: blog.published ? "#065f46" : "#374151",
                    color: "white",
                  }}
                >
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
