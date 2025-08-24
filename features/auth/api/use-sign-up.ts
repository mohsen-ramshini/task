import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from "sonner";

  
export const useSignup = () => {
  return useMutation<{
    message: string;
    access: string;
    refresh: string;
  }, AxiosError & { assigned_patients: number[] }>({
    mutationFn: async (data) => {
      console.log("Signup Data:", data);
      return { message: "Signup successful (mock)", access: "mock-access-token", refresh: "mock-refresh-token" };
    },

    onSuccess: (data) => {
      if (data.access) {
        localStorage.setItem('access_token', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      toast.success("Signup successful!");
      setTimeout(() => {
        window.location.href = '/auth/sign-in';
      }, 1200);
    },

    onError: () => {
      toast.error("Signup failed. Please check your information.");
    },
  });
};
