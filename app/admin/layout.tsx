"use client";

import React, { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1  overflow-y-auto p-6 bg-gray-900 text-text-primary">
        {children}
      </main>
    </div>
  );
}
