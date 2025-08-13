import { NextRequest, NextResponse } from "next/server";
import {
  createSaveBlog,
  updateBlog,
  uploadBlogImage,
} from "@/app/_lib/data-services";
import { CreateBlogInput } from "@/app/_lib/types";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const title = String(form.get("title") || "");
    const excerpt = String(form.get("excerpt") || "");
    const content = String(form.get("content") || "");
    const author = String(form.get("author") || "Admin");
    const published = String(form.get("published") || "false") === "true";
    const cover_image = String(form.get("cover_image") || "");
    const imageFile = form.get("imageFile") as File | null;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data } = await createSaveBlog({
      title,
      excerpt,
      content,
      cover_image,
      author,
      published,
    } as CreateBlogInput);

    if (imageFile) {
      const url = await uploadBlogImage(imageFile, String(data.id));
      await updateBlog(data.id, { cover_image: url });
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
