import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "../features/auth/components/Auth";
import {SigninForm} from "../features/auth/components/SigninForm";
import SignUpForm from "../features/auth/components/SignUpForm";
import ForgetPassword from "../features/auth/components/ForgetPassword";
import Dashboard from "../features/dashboard/components/Dashboard";

// Protected Route
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// اضافه کنید:
import { Toaster } from "./components/ui/sonner"; // مسیر صحیح برای Toaster

// Create the query client instance:
const queryClient = new QueryClient();
function ProtectedRoute({ children }: React.PropsWithChildren<{}>) {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return access_token && refresh_token ? children : <Navigate to="/auth/sign-in" />;
}

// Auth layout wrapper with Outlet
function AuthLayout() {
  return (
    <Auth>
      <Outlet />
    </Auth>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* روت‌های احراز هویت با layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="sign-in" replace />} />
            <Route path="sign-in" element={<SigninForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>
          {/* روت محافظت‌شده */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth/sign-in" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
