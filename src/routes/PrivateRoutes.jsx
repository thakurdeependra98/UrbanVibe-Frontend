import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthSession } from "../services/auth";

const PrivateRoute = ({ role, children }) => {
  const session = getAuthSession();
  const user = session?.user;
  const isAuthenticated = Boolean(session);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
