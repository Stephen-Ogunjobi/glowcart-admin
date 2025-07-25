import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaHome, FaBox, FaClipboardList, FaUsers } from "react-icons/fa"; // Import icons

export default function Sidebar() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  const linkClasses = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center p-2 rounded-md transition-colors ${
      isActive ? "font-semibold" : ""
    }`;
  };

  const linkStyles = (href: string) => {
    const isActive = pathname === href;
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
            className="rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-6 text-center">GlowCart</h1>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/admin/home"
              className={linkClasses("/admin/home")}
              style={linkStyles("/admin/home")}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
            <Link
              href="/admin/products"
              className={linkClasses("/admin/products")}
              style={linkStyles("/admin/products")}
            >
              <FaBox className="mr-3" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className={linkClasses("/admin/orders")}
              style={linkStyles("/admin/orders")}
            >
              <FaClipboardList className="mr-3" />
              Orders
            </Link>
            <Link
              href="/admin/users"
              className={linkClasses("/admin/users")}
              style={linkStyles("/admin/users")}
            >
              <FaUsers className="mr-3" />
              Users
            </Link>
          </nav>
        </aside>
      )}
    </div>
  );
}
