import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthSession } from "../services/auth";

const PrivateRoute = ({ role, children }) => {
  const isAuthenticated =
    localStorage.getItem("isLoggedIn") === "true";

  const session = getAuthSession();
  const user = session?.user;

  console.log("PrivateRoute:", {
    isAuthenticated,
    expectedRole: role,
    actualRole: user?.role,
    user,
  });

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;