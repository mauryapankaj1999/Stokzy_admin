"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,

        style: {
          background: "#fff",
          color: "#0f172a",
          borderRadius: "12px",
          padding: "14px 18px",
        },

        success: {
          style: {
            border: "1px solid #57A846",
          },
        },

        error: {
          style: {
            border: "1px solid #ef4444",
          },
        },
      }}
    />
  );
}