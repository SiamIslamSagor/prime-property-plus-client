import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../page/Home";
import AuthPage from "../layout/AuthPage";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import AllProperties from "../page/AllProperties";
import PropertyDetails from "../page/PropertyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "all-properties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "/property-details/:id",
        element: <PropertyDetails></PropertyDetails>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage></AuthPage>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
