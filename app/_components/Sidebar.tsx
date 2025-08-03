"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function Sidebar({
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  const isLoginPage = pathname === "/admin/login";

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileToggle = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  if (isLoginPage) {
    return null;
  }

  const sidebarContent = (
    <>
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
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile/tablet */}
      <button
        onClick={handleMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md transition-colors duration-200"
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <aside
        className="hidden lg:block w-64 h-full p-4 space-y-4"
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 w-64 h-full p-4 space-y-4 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-opacity-10 transition-colors duration-200"
          style={{ color: "var(--text-primary)" }}
          aria-label="Close mobile menu"
        >
          <FaTimes size={20} />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}
