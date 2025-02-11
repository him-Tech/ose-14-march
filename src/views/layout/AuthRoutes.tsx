import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/app/authenticate/AuthContext";
import { UserRole } from "src/model";
import { config, Env } from "src/ultils";
import { PageNotFound } from "../pages/PageNotFound";

import { PageLoader } from "src/views/components/common/PageLoader";

export function AuthRoutes(props: { redirect: string }) {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <PageLoader message="Authenticating user..." /> : auth.authInfo?.user ? <Outlet /> : <Navigate to={props.redirect} />;
  }
}

export function UnAuthRoutes(props: { redirect: string }) {
  const auth = useAuth();

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    return auth.loading ? <PageLoader message="Loading user data..." /> : auth.authInfo?.user ? <Navigate to={props.redirect} /> : <Outlet />;
  }
}

export function NonProdRoutes() {
  if (config.env !== Env.Production) {
    return <Outlet />;
  } else {
    return <PageNotFound />;
  }
}

export function SuperAdminRoutes() {
  const auth = useAuth();

  const allowed = auth.authInfo?.user?.role === UserRole.SUPER_ADMIN;

  if (config.api.useMock) {
    return <Outlet />;
  } else {
    // TODO: add redirect "redirect" if it could be admin
    return auth.loading ? <PageLoader message="Checking permissions..." /> : allowed ? <Outlet /> : <Navigate to="/sign-up" />; // TODO: add  404 page
  }
}

export function Logout(props: { redirect: string }) {
  const auth = useAuth();

  auth.logout();

  return auth.loading ? <PageLoader message="Logging out..." /> : <Navigate to={props.redirect} />;
}
