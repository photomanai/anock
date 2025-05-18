import React from "react";
import useIsLogged from "../hooks/useIsLogged";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtected = () => {
  const isLogged = useIsLogged();

  if (isLogged === null) return null;
  return isLogged ? <Navigate to="/chat" replace /> : <Outlet />;
};

export default AuthProtected;
