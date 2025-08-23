import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "../features/auth/components/Auth";



// فرم‌های ساده
function SignIn() {
  return <div>Sign In Page</div>;
}
function SignUp() {
  return <div>Sign Up Page</div>;
}
function ForgetPassword() {
  return <div>Forget Password Page</div>;
}
function Dashboard() {
  return <div>Dashboard (Protected)</div>;
}

// Protected Route
function ProtectedRoute({ children }) {
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
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
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
