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
import MakeAnOffer from "../page/MakeAnOffer";
import PropertyBought from "../components/pageComponents/PropertyBought/PropertyBought";

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
      {
        path: "/make-an-offer/:id",
        element: (
          <PrivetRoute>
            <MakeAnOffer></MakeAnOffer>
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
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <PrivetRoute>
            <UserProfile></UserProfile>
          </PrivetRoute>
        ),
      },
      {
        path: "wish-list",
        element: (
          <PrivetRoute>
            <MyWishList></MyWishList>
          </PrivetRoute>
        ),
      },
      {
        path: "property-bought",
        element: (
          <PrivetRoute>
            <PropertyBought></PropertyBought>
          </PrivetRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivetRoute>
            <div>
              <SectionTitle heading={"My reviews"}></SectionTitle>
            </div>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
