import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Comparison from "./routes/Comparison";
import Home from "./routes/Home";
import Timeline from "./routes/Timeline";
import './App.css';  // Make sure the file name matches

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
      { path: "/", element: <Home /> },
      { path: "comparison", element: <Comparison /> },
      { path: "timeline", element: <Timeline /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
