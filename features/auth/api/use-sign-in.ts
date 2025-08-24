import { useMutation } from '@tanstack/react-query';
// import axiosInstance from '../../../api/axiosInstance';
import { AxiosError } from 'axios';
import { toast } from "sonner";

export const useSignIn = () => {
  return useMutation<{
    message: string;
    access: string;
    refresh: string;
  }, AxiosError, { username: string; password: string }>({
    mutationFn: async (data) => {
      // فقط لاگ گرفتن دیتا
      console.log("Signup Data:", data);
      // ماک: هیچ درخواست واقعی ارسال نمی‌شود
      return { message: "Signup successful (mock)", access: "mock-access-token", refresh: "mock-refresh-token" };
    },

    onSuccess: (data) => {
      if (data.access) {
        localStorage.setItem('access_token', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1200);
    },

    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });
};
