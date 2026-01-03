import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

/**
 * ProtectedRoute
 * @param children - React nodes to render if access allowed
 * @param allowedRoles - array of roles allowed for this route (optional)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is restored
  if (loading) return null; // or a spinner

  // Not authenticated → redirect to login
  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If allowedRoles is provided, check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard or show "Not Authorized"
    return <Navigate to="/dashboard" replace />;
  }

  // Access allowed
  return children;
}
