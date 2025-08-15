import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthGuard({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  if (!isHydrated) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
