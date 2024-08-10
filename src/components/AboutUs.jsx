import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { userList } from "../redux/userSlice";
import Messages from "./Messages";
import Loader from "./Loader";
import { Avatar } from "@material-tailwind/react";

const About = ({ username, email, userImage }) => (
  <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
    <h2 className="text-lg font-semibold mb-2 text-gray-800">
      Contacto del Administrador:
    </h2>
    <div className="mt-3 flex items-center">
      <span className="text-gray-600">Nombre de usuario: </span>
      <Avatar src={userImage} className="rounded-full mx-2" alt="" />
      <span className="font-bold text-gray-800">{username}</span>
    </div>
    <div className="mt-3 flex items-center">
      <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
        <span className="text-gray-600">Correo: </span>
        {email}
      </a>
    </div>
  </div>
);

About.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
};

const AboutUs = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, loading, users, userInfo } = user;

  React.useEffect(() => {
    dispatch(userList({ token: userInfo.token }));
  }, [dispatch, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
          {users
            ?.filter((user) => user.role === "admin")
            .map((user) => (
              <About
                key={user.id}
                username={user.user_name}
                email={user.email}
                userImage={user ? `${URL}${user.image}` : ""}
              />
            ))}
        </div>
      )}
      <p className="fixed bottom-28 text-gray-600 text-center mx-auto bg-white p-4 w-full">
        Queda totalmente prohibida la reproducción parcial o total de los
        documentos que aquí se encuentran.
      </p>
    </>
  );
};

export default AboutUs;
