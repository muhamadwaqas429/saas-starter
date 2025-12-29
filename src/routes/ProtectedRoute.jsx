import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is restored from localStorage
  if (loading) {
    return null; // or a spinner if you want
  }

  // Not authenticated → go to login
  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Authenticated → allow access
  return children;
}
