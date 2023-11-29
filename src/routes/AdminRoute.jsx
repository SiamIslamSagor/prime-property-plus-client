import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useContextData from "../hooks/useContextData";
import useAdmin from "../hooks/useAdmin";
const AdminRoute = ({ children }) => {
  const { user, Loading } = useContextData();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (Loading || isAdminLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
