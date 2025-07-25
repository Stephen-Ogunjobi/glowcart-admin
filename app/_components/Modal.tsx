"use client";

import React, { useRef, useEffect } from "react";
import { useModal } from "@/app/_context/ModalContext";

export default function Modal({ children }: { children: React.ReactNode }) {
  const { isOpen, handleClose } = useModal();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl"
        style={{
          backgroundColor: "var(--sidebar)",
          color: "var(--text-primary)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute text-2xl leading-none text-gray-500 top-3 right-3 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
}
