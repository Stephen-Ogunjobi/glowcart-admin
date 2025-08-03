"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  const isLoginPage = pathname === "/admin/login";

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };

  const handleLogout = () => {
    // Clear the cookie
    document.cookie = "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Navigate to login page
    router.push("/admin/login");
  };

  const linkClasses = (href: string) => {
    const isActive = activeLink === href;
    return `flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out transform
      hover:bg-opacity-10 hover:scale-[1.02] hover:shadow-lg hover:translate-x-1
      active:scale-[0.98] active:transition-none
      ${isActive ? "font-semibold shadow-md" : "hover:font-medium"}`;
  };

  const linkStyles = (href: string) => {
    const isActive = activeLink === href;
    return {
      color: isActive ? "var(--accent-buttons)" : "var(--text-primary)",
      textDecoration: "none",
      backgroundColor: isActive ? "var(--hover-focus)" : "transparent",
    };
  };

  return (
    <div>
      {!isLoginPage && (
        <aside
          className="w-64 h-full p-4 space-y-4"
          style={{
            backgroundColor: "var(--sidebar)",
            color: "var(--text-primary)",
          }}
        >
          <Image
            src="/Elegant GlowCart Skincare Logo.png"
            alt="GlowCart Logo"
            width={100}
            height={100}
            quality={100}
            priority={true}
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-6 text-center">GlowCart</h1>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/admin/home"
              className={linkClasses("/admin/home")}
              style={linkStyles("/admin/home")}
              onClick={() => handleLinkClick("/admin/home")}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
            <Link
              href="/admin/products"
              className={linkClasses("/admin/products")}
              style={linkStyles("/admin/products")}
              onClick={() => handleLinkClick("/admin/products")}
            >
              <FaBox className="mr-3" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className={linkClasses("/admin/orders")}
              style={linkStyles("/admin/orders")}
              onClick={() => handleLinkClick("/admin/orders")}
            >
              <FaClipboardList className="mr-3" />
              Orders
            </Link>
            <Link
              href="/admin/users"
              className={linkClasses("/admin/users")}
              style={linkStyles("/admin/users")}
              onClick={() => handleLinkClick("/admin/users")}
            >
              <FaUsers className="mr-3" />
              Users
            </Link>
          </nav>
          <button
            onClick={handleLogout}
            className={linkClasses("/admin/login")}
            style={linkStyles("/admin/login")}
            type="button"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </aside>
      )}
    </div>
  );
}
