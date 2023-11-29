import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAgent from "../hooks/useAgent";
import useContextData from "../hooks/useContextData";
const AgentRoute = ({ children }) => {
  const { user, Loading } = useContextData();
  const [isAgent, isAgentLoading] = useAgent();
  const location = useLocation();

  if (Loading || isAgentLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAgent) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/"></Navigate>;
};

AgentRoute.propTypes = {
  children: PropTypes.node,
};

export default AgentRoute;
