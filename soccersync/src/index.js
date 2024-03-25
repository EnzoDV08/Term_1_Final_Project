import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Timeline from "./routes/Timeline";
import Home from "./routes/Home";
import Comparison from "./routes/Comparison";
import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "comparison",
          element: <Comparison />,
        },
        {
            path: "timeline",
            element: <Timeline />,
          },
      ],
    },
  ]);
  
  createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );