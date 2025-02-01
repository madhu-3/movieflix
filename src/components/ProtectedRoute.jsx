import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userConfig.user);
  return user === null ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
