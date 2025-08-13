"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { FaUpload } from "react-icons/fa";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FormFields = {
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published: boolean;
  imageFile?: FileList;
};

export default function NewBlog() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      cover_image: "",
      author: "Admin",
      published: false,
    },
  });

  const selectedFile = watch("imageFile")?.[0];

  const onSubmit = async (values: FormFields) => {
    const sanitizedContent = DOMPurify.sanitize(values.content);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("excerpt", values.excerpt);
    formData.append("content", sanitizedContent);
    formData.append("cover_image", values.cover_image || "");
    formData.append("author", values.author || "Admin");
    formData.append("published", String(Boolean(values.published)));
    const file = values.imageFile?.[0];
    if (file) formData.append("imageFile", file);

    const res = await fetch("/api/blogs", { method: "POST", body: formData });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to create blog");
    }
    window.location.assign("/admin/blogs");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Title
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full rounded-md border px-3 py-2 bg-transparent"
          style={{
            borderColor: "var(--border-stroke)",
            color: "var(--text-primary)",
          }}
          placeholder="Enter blog title"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Excerpt
        </label>
        <textarea
          {...register("excerpt", { required: true })}
          className="w-full rounded-md border px-3 py-2 bg-transparent"
          style={{
            borderColor: "var(--border-stroke)",
            color: "var(--text-primary)",
          }}
          rows={3}
          placeholder="Short summary for the blog"
        />
      </div>

      <div data-color-mode="dark">
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Content
        </label>
        <div
          className="border rounded-md overflow-hidden"
          style={{ borderColor: "var(--border-stroke)" }}
        >
          <MDEditor
            value={watch("content")}
            onChange={(val) => setValue("content", val || "")}
            previewOptions={{
              components: {},
            }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Cover Image
        </label>
        <div
          className="w-full rounded-md border bg-transparent"
          style={{ borderColor: "var(--border-stroke)" }}
        >
          <label
            className="flex items-center justify-between px-3 py-2 cursor-pointer"
            style={{ color: "var(--text-primary)" }}
            htmlFor="imageFile"
          >
            <span className="flex items-center space-x-2">
              <FaUpload />
              <span>
                {selectedFile ? selectedFile.name : "Choose file to upload"}
              </span>
            </span>
            <span
              className="px-3 py-1 rounded-md text-sm"
              style={{
                backgroundColor: "var(--accent-buttons)",
                color: "white",
              }}
            >
              Browse
            </span>
          </label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            {...register("imageFile")}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Author
          </label>
          <input
            type="text"
            {...register("author")}
            className="w-full rounded-md border px-3 py-2 bg-transparent"
            style={{
              borderColor: "var(--border-stroke)",
              color: "var(--text-primary)",
            }}
            placeholder="Author name"
          />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <input
            type="checkbox"
            id="published"
            {...register("published")}
            className="w-4 h-4 accent-blue-600"
          />
          <label
            htmlFor="published"
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Published
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md text-sm sm:text-base transition-colors"
          style={{
            backgroundColor: "var(--accent-buttons)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {isSubmitting ? "Saving..." : "Create Blog"}
        </button>
      </div>
    </form>
  );
}
