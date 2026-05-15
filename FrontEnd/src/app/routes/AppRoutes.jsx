import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../../features/Auth/pages/LoginPage";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../../features/Dashboard/pages/DashboardPage";
import AuthLayout from "../layout/AuthLayout";
import RegisterPage from "../../features/Auth/pages/RegisterPage";
import InitialData from "../../utils/initialData";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoute = () => {
  InitialData();
  ProtectedRoute();
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <DashboardPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
