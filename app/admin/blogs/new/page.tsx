import Heading from "@/app/_components/Heading";
import NewBlog from "@/app/_components/NewBlog";

export default function page() {
  return (
    <div className="space-y-6 pb-6">
      <div
        className="flex items-center justify-between p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--sidebar)",
          borderColor: "var(--border-stroke)",
        }}
      >
        <Heading>Create New Blog</Heading>
      </div>
      <NewBlog />
    </div>
  );
}
