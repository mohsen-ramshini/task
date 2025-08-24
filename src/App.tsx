import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Auth from "../features/auth/components/Auth";
import {SigninForm} from "../features/auth/components/SigninForm";
import SignUpForm from "../features/auth/components/SignUpForm";
import ForgetPassword from "../features/auth/components/ForgetPassword";
import Dashboard from "../features/dashboard/components/Dashboard";

// Protected Route
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

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

function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#18181b] transition-colors">
      <span className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") return true;
      if (theme === "light") return false;
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      className="fixed top-4 left-4 z-[10000] bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-full p-2 shadow transition-colors"
      onClick={() => setIsDark((d) => !d)}
      aria-label="Toggle dark mode"
      type="button"
    >
      {isDark ? (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M17.75 15.5a7.25 7.25 0 0 1-7.25-7.25c0-1.7.57-3.27 1.53-4.53A.75.75 0 0 0 10.5 2a10 10 0 1 0 11.5 11.5.75.75 0 0 0-1.72-.53 7.22 7.22 0 0 1-2.53 2.53.75.75 0 0 0 0 1.3Z"/></svg>
      ) : (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.25" stroke="currentColor" strokeWidth="1.5"/><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 2.75v1.5M12 19.75v1.5M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M2.75 12h1.5M19.75 12h1.5M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06"/></svg>
      )}
    </button>
  );
}

// این کامپوننت را اضافه کن
function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700); // مدت زمان لودینگ (قابل تنظیم)
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <ThemeToggle />
      <Toaster />
      {loading && <GlobalLoader />}
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
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
