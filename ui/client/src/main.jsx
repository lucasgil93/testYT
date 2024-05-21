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
import Order from "./routes/order";

//This file handles the routing of pages in react with the paths being the relative urls and the elements connecting the imported components to said urls
//Also handles the error page in case a route is poorly done.

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
  },
  {
    path: "order",
    element: <Order/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
