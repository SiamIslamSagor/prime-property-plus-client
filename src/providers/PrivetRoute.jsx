import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useContextData from "../hooks/useContextData";

const PrivetRoute = ({ children }) => {
  const { user, Loading } = useContextData();
  const location = useLocation();
  console.log(Loading);

  if (Loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={{ from: location }} to="/auth/login"></Navigate>;
  }

  return children;
};

PrivetRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivetRoute;
