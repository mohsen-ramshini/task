import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../features/auth/components/SigninForm";
import SignUp from "../features/auth/components/SignupForm";
import ForgetPassword from "../features/auth/components/ForgetPassword";
import Dashboard from "../features/dashboard/components/Dashboard";
import type { PropsWithChildren } from "react";

// Protected Route
function ProtectedRoute({ children }: PropsWithChildren) {
  const isAuth = !!localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/signIn" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  );
}
