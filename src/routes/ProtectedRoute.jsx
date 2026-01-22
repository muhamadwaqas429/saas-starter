import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // wait for auth

  if (!user?.token)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/dashboard" replace />;

  return children;
}
