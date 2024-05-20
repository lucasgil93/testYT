import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./error-page";
import Menu from "./routes/menu";
import About from "./routes/about";
import Reserve from "./routes/reserve";
import Connect from "./routes/connect";
import Manage from "./routes/manage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "reserve",
    element: <Reserve />,
  },
  {
    path: "reviews",
    element: <Connect />,
  },
  {
    path: "menu",
    element: <Menu />,
  },
  {
    path: "manage",
    element: <Manage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
