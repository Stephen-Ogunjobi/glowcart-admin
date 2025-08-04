import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { ModalContextProvider } from "./_context/ModalContext";
import { Toaster } from "react-hot-toast";
import { validateEnvironmentVariables } from "./_lib/env-validation";

// Validate environment variables on app startup
if (typeof window === "undefined") {
  validateEnvironmentVariables();
}

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | GlowCart Admin",
    default: "GlowCart Admin Dashboard",
  },
  description: "GlowCart Admin Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}antialiased min-h-screen`}>
        <ModalContextProvider>{children}</ModalContextProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
