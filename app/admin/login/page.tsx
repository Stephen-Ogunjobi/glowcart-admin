"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      document.cookie = "isAdmin=true; path=/;";
      router.push("/admin/home");
    } else {
      toast.error("Invalid credentials.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/Elegant GlowCart Skincare Logo.png"
            alt="logo"
            width={120}
            height={120}
            className="rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-2xl font-bold ">GlowCart</h1>
      </div>

      {/* Login Form Section */}
      <div className="w-full max-w-md px-8 py-8 bg-gray-900 shadow-xl rounded-2xl border border-gray-300">
        <h3 className="text-2xl font-bold text-center text-gray-200 mb-6">
          Admin Login
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 font-medium text-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
