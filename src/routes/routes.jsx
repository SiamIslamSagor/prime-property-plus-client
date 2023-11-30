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
import UserProfile from "../components/pageComponents/UserProfile/UserProfile";
import MyWishList from "../components/pageComponents/MyWishList/MyWishList";
import MakeAnOffer from "../page/MakeAnOffer";
import PropertyBought from "../components/pageComponents/PropertyBought/PropertyBought";
import UserReview from "../components/pageComponents/UserReview/UserReview";
import Payment from "../components/pageComponents/Payment/Payment";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import ErrorPage from "../page/ErrPage/ErrorPage";
import ManageProperties from "../page/ManageProperties";
import ManageUsers from "../page/ManageUsers";
import ManageReviews from "../page/ManageReviews";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AgentAddedProperties from "../page/AgentAddedProperties";
import UpdateProperty from "../page/UpdateProperty";
import AddProperty from "../page/AddProperty";
import RequestedProperties from "../page/RequestedProperties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
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
            <UserReview></UserReview>
          </PrivetRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },

      // admin route
      {
        path: "manage-properties",
        element: (
          <AdminRoute>
            <PrivetRoute>
              <ManageProperties></ManageProperties>
            </PrivetRoute>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <PrivetRoute>
              <ManageUsers></ManageUsers>
            </PrivetRoute>
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <AdminRoute>
            <PrivetRoute>
              <ManageReviews></ManageReviews>
            </PrivetRoute>
          </AdminRoute>
        ),
      },

      // agent route
      {
        path: "add-property",
        element: (
          <AgentRoute>
            <PrivetRoute>
              <AddProperty></AddProperty>
            </PrivetRoute>
          </AgentRoute>
        ),
      },
      {
        path: "my-added-properties",
        element: (
          <AgentRoute>
            <PrivetRoute>
              <AgentAddedProperties></AgentAddedProperties>
            </PrivetRoute>
          </AgentRoute>
        ),
      },
      {
        path: "update-my-properties/:id",
        element: (
          <AgentRoute>
            <PrivetRoute>
              <UpdateProperty></UpdateProperty>
            </PrivetRoute>
          </AgentRoute>
        ),
      },
      {
        path: "requested-properties",
        element: (
          <AgentRoute>
            <PrivetRoute>
              <RequestedProperties></RequestedProperties>
            </PrivetRoute>
          </AgentRoute>
        ),
      },
    ],
  },
]);

export default router;
