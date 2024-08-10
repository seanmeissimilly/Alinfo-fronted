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
import Select from "react-select";
import makeAnaimated from "react-select/animated";
import { useSpring, animated } from "react-spring";
import moment from "moment/moment.js";

const Tools = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [classificationSelected, setClassificationSelected] = useState([]);
  const animatedComponets = makeAnaimated();

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

  //metodo de filtrado
  let results = [...apps];

  if (classificationSelected.length !== 0) {
    results = results.filter((app) => {
      return classificationSelected.some(
        (selected) => selected.value === app.applicationclassification
      );
    });
  }
  if (search !== "") {
    results = results.filter((tool) =>
      tool.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const handleDelete = (id) => {
    if (
      window.confirm(
        "⚠️ Atención ⚠️\n\n¿Estás seguro de que deseas borrar esta herramienta?\nEsta acción no se puede deshacer."
      )
    ) {
      dispatch(appDelete({ id, token: userInfo.token }));
    }
  };
  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  const scale = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    delay: 500,
  });

  const renderApps = () => {
    // Ordeno los documentos por ID antes de renderizarlos
    const sortedApps = results.sort((a, b) => b.id - a.id);
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
          email={user ? user.email : ""}
          userInfo={userInfo}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={app.data}
          date={formatDate(app.date)}
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
            <animated.input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Buscar"
              className="block min-w-0 rounded border border-solid bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-800 dark:focus:border-primary"
              id="search"
              style={{ ...fadeIn, ...scale }}
            />
            <div className="ml-1">
              <Select
                isMulti
                placeholder="Clasificación"
                options={appclassification.map((type) => ({
                  value: type.id,
                  label: type.description,
                }))}
                onChange={(e) => {
                  setClassificationSelected(e);
                }}
                components={animatedComponets}
                className="w-full rounded border bg-transparent text-base font-normal text-neutral-700 dark:border-neutral-600 dark:text-neutral-800"
              />
            </div>
          </div>
          <div className="container mx-auto p-4 mb-16">
            {["admin", "editor"].includes(userInfo.role) && (
              <div className="mb-8 flex justify-start">
                <a
                  href="/tools/createTool"
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
