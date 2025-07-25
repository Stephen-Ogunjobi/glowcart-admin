"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, handleOpen, handleClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error("Modal context was used outside of its provider");

  return context;
}

export { ModalContextProvider, useModal };
