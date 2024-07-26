import { useEffect, useState } from "react";
import Video from "./Video.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  multimediaList,
  multimediaDelete,
  multimediaclassificationList,
} from "../redux/multimediaSlice.js";
import { userList } from "../redux/userSlice.js";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { AiFillPlusSquare } from "react-icons/ai";
import Select from "react-select";
import makeAnaimated from "react-select/animated";
import { useSpring, animated } from "react-spring";
import moment from "moment/moment.js";

const Videos = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [classificationSelected, setClassificationSelected] = useState([]);
  const animatedComponets = makeAnaimated();

  const {
    multimedias,
    multimediaclassification,
    multimediaInfo,
    error,
    loading,
  } = useSelector((state) => state.multimedia);

  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(multimediaclassificationList({ token: userInfo.token }));
      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, multimediaInfo, error]);

  //metodo de filtrado
  let results = [...multimedias];

  if (classificationSelected.length !== 0) {
    results = results.filter((video) => {
      return classificationSelected.some(
        (selected) => selected.value === video.multimediaclassification
      );
    });
  }
  if (search !== "") {
    results = results.filter((video) =>
      video.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este video?")) {
      dispatch(multimediaDelete({ id, token: userInfo.token }));
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

  const renderMultimedias = () => {
    // Ordeno los documentos por ID antes de renderizarlos
    const sortedMultimedias = results.sort((a, b) => b.id - a.id);
    return sortedMultimedias.map((video) => {
      const user = users.find((user) => user.user_name === video.user);

      const classification = multimediaclassification.find(
        (classification) => classification.id === video.multimediaclassification
      );

      return (
        <Video
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          classification={
            classification
              ? String(classification.description)
              : String(video.multimediaclassification)
          }
          user={video.user}
          email={user ? user.email : ""}
          userInfo={userInfo}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={video.data}
          date={formatDate(video.date)}
          onDelete={() => handleDelete(video.id)}
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
                options={multimediaclassification.map((type) => ({
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
              <div className="mb-4 flex justify-start">
                <a
                  href="/videos/createVideo"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                  title="Añadir Video"
                >
                  <AiFillPlusSquare
                    className="text-green-900 hover:text-gray-900"
                    size={30}
                  />
                </a>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderMultimedias()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Videos;
