// src/components/ToastNotification.tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
  toast[type](message);
};

export function ToastNotif() {
  return <ToastContainer position="top-right" autoClose={3000}  />;
}
