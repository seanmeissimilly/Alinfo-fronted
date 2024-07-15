import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  if (isEmpty(userInfo) || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
