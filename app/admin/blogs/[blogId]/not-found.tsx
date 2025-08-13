import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Blog Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The blog you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/admin/blogs"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
}
