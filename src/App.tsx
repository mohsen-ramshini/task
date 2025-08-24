import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "../features/auth/components/Auth";
import {SigninForm} from "../features/auth/components/SigninForm";
import SignUpForm from "../features/auth/components/SignUpForm";
import ForgetPassword from "../features/auth/components/ForgetPassword";
import Dashboard from "../features/dashboard/components/Dashboard";

// Protected Route
import React from "react";

function ProtectedRoute({ children }: React.PropsWithChildren<{}>) {
  const isAuth = !!localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/auth/sign-in" />;
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
  );
}
