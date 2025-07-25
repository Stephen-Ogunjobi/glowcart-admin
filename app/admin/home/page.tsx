"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/home");
  }, [router]);

  return null;
}
