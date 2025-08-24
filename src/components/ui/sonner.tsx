import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      position="top-center"
      theme="light"
      toastOptions={{
        style: {
          background: "#2563eb", // blue-600
          color: "#fff",
        },
        className: "border-none shadow-lg",
      }}
    />
  );
}
