import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import ProtectedRoute from "./ProtectedRoute";
import AuthProtected from "./AuthProtected";

const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<AuthProtected />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
