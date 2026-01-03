import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function RoleRoute({ allow, children }) {
  const { user, loading } = useAuth();

  // Wait until auth state is restored
  if (loading) return null;

  // Not logged in
  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (!allow.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Allowed
  return children;
}
