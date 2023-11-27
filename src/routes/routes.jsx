import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../page/Home";
import AuthPage from "../layout/AuthPage";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import AllProperties from "../page/AllProperties";
import PropertyDetails from "../page/PropertyDetails";
import PrivetRoute from "../providers/PrivetRoute";
import Dashboard from "../layout/Dashboard";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import UserProfile from "../components/pageComponents/UserProfile/UserProfile";
import MyWishList from "../components/pageComponents/MyWishList/MyWishList";

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
        element: (
          <PrivetRoute>
            <AllProperties></AllProperties>
          </PrivetRoute>
        ),
      },
      {
        path: "/property-details/:id",
        element: (
          <PrivetRoute>
            <PropertyDetails></PropertyDetails>
          </PrivetRoute>
        ),
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
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <UserProfile></UserProfile>,
      },
      {
        path: "wish-list",
        element: <MyWishList></MyWishList>,
      },
      {
        path: "property-bought",
        element: (
          <div>
            <SectionTitle heading={"property bought"}></SectionTitle>
          </div>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <div>
            <SectionTitle heading={"My reviews"}></SectionTitle>
          </div>
        ),
      },
    ],
  },
]);

export default router;
