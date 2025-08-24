import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSignOut() {
  const navigate = useNavigate();

  return useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Signed out successfully.");
    setTimeout(() => {
      navigate("/auth/sign-in", { replace: true });
    }, 1000);
  }, [navigate]);
}
