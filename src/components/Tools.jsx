import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appList,
  appDelete,
  appClassificationList,
} from "../redux/appSlice.js";
import { userList } from "../redux/userSlice.js";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { AiFillPlusSquare } from "react-icons/ai";
import Tool from "./Tool.jsx";

const Tools = () => {
  const URL =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:8000";
  const dispatch = useDispatch();

  const { apps, appclassification, appInfo, error, loading } = useSelector(
    (state) => state.app
  );

  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(appList({ token: userInfo.token }));
      dispatch(appClassificationList({ token: userInfo.token }));
      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, appInfo, error]);

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas borrar esta herramienta?")
    ) {
      dispatch(appDelete({ id, token: userInfo.token }));
    }
  };

  const renderApps = () => {
    const sortedApps = [...apps].sort((a, b) => a.id - b.id);
    return sortedApps.map((app) => {
      const user = users.find((user) => user.user_name === app.user);

      const classification = appclassification.find(
        (classification) => classification.id === app.applicationclassification
      );

      return (
        <Tool
          key={app.id}
          id={app.id}
          title={app.title}
          description={app.description}
          classification={
            classification
              ? String(classification.description)
              : String(app.applicationclassification)
          }
          user={app.user}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={app.data}
          date={app.date.substring(0, 10)}
          onDelete={() => handleDelete(app.id)}
        />
      );
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="container mx-auto p-4">
          {["admin", "editor"].includes(userInfo.role) && (
            <div className="mb-4 flex justify-start">
              <a
                href="/createTool"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="Añadir Herramienta"
              >
                <AiFillPlusSquare
                  className="text-green-900 hover:text-gray-900"
                  size={30}
                />
              </a>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderApps()}
          </div>
        </div>
      )}
    </>
  );
};

export default Tools;
