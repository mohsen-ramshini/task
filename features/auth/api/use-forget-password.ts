import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useForgetPassword() {
  return useMutation<
    { message: string },
    AxiosError,
    { email?: string; phone?: string }
  >({
    mutationFn: async (data) => {
      console.log("ForgetPassword Data:", data);
      return { message: "Password reset code sent (mock)" };
    },
    onSuccess: () => {
      toast.success("Password reset code sent.");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send password reset code.");
    },
  });
}