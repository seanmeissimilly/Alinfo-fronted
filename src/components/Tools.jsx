import { useEffect, useState } from "react";
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
  const URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

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

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  const results = !search
    ? [...apps]
    : [...apps].filter((tool) =>
        tool.title.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que deseas borrar esta herramienta?")
    ) {
      dispatch(appDelete({ id, token: userInfo.token }));
    }
  };

  const renderApps = () => {
    // Ordeno los documentos por ID antes de renderizarlos
    const sortedApps = results.sort((a, b) => a.id - b.id);
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
        <div>
          <div className="mb-3 mt-3 mr-3 flex justify-end">
            <input
              value={search}
              onChange={searcher}
              type="search"
              placeholder="Buscar"
              className="block min-w-0 rounded border border-solid bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-800 dark:focus:border-primary"
              id="search"
            />
          </div>
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
        </div>
      )}
    </>
  );
};

export default Tools;
