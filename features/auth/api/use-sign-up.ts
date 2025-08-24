import { useMutation } from '@tanstack/react-query';
// import axiosInstance from '../../../api/axiosInstance';
import { AxiosError } from 'axios';
import { toast } from "sonner";

  
export const useSignup = () => {
  return useMutation<{
    message: string;
    access: string;
    refresh: string;
  }, AxiosError & { assigned_patients: number[] }>({
    mutationFn: async (data) => {
      // فقط لاگ گرفتن دیتا
      console.log("Signup Data:", data);
      // ماک: هیچ درخواست واقعی ارسال نمی‌شود
      return { message: "Signup successful (mock)", access: "mock-access-token", refresh: "mock-refresh-token" };
    },

    onSuccess: (data) => {
      // ذخیره توکن‌ها در localStorage
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
      // setTimeout(() => {...}, 1200);
    },
  });
};
