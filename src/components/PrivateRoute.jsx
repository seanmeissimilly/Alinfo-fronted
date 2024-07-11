import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  //Reviso si userInfo no está vacio para saber si hay algún usuario logueado.
  return userInfo !== undefined && userInfo.length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/landing" />
  );
};

export default PrivateRoute;
