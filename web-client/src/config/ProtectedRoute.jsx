import React from "react";
import useIsLogged from "../hooks/useIsLogged";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogged = useIsLogged();

  if (isLogged === null) return null;
  return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
