import React from "react";
import Link from "next/link";
import { getBlogs } from "@/app/_lib/data-services";
import { BlogType } from "@/app/_lib/types";
import BlogCard from "./BlogCard";

export default async function Blogs() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog: BlogType) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
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
  );
}
