"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      richColors
      closeButton
      expand
      visibleToasts={3}
      toastOptions={{
        style: {
          borderRadius: "0.25rem",
          border: "1px solid #111111",
          background: "#fffdf8",
          color: "#161616",
        },
      }}
    />
  );
}
