import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return (
      <main className="felx items-center justify-center">
        <div>Loading...</div>
      </main>
    );
  }
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
