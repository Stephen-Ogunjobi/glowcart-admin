"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "../_components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-900 text-text-primary lg:ml-0 transition-all duration-300">
        <div className="lg:hidden h-16 w-full" />
        {children}
      </main>
    </div>
  );
}
