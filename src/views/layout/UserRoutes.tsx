import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { UserRole } from "src/model";

export function UserRoutes() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function AuthRoutes() {
  const auth = useAuth();

  return auth.loading ? <div>Loading...</div> : auth.user ? <Navigate to="/" /> : <Outlet />;
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.user?.role === UserRole.SUPER_ADMIN;

  return auth.loading ? <div>Loading...</div> : allowed ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function Logout() {
  const auth = useAuth();

  auth.logout();

  return auth.loading ? <div>Loading...</div> : <Navigate to="/" />;
}
