import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function RoleRoute({ allow, children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user?.token) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
}
