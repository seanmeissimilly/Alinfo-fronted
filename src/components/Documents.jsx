import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  documentList,
  documentDelete,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";
import { userList } from "../redux/userSlice.js";
import Document from "./Document";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { AiFillPlusSquare } from "react-icons/ai";
import Select from "react-select";
import makeAnaimated from "react-select/animated";
import { useSpring, animated } from "react-spring";
import moment from "moment/moment.js";

const Documents = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [typeSelected, setTypeSelected] = useState([]);
  const [classificationSelected, setClassificationSelected] = useState([]);
  const animatedComponets = makeAnaimated();

  const {
    documents,
    documenttypes,
    documentclassification,
    documentInfo,
    error,
    loading,
  } = useSelector((state) => state.document);
  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(documentList({ token: userInfo.token }));
      dispatch(documenttypesList({ token: userInfo.token }));
      dispatch(documentclassificationList({ token: userInfo.token }));
      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, documentInfo, error]);

  //metodo de filtrado
  let results = [...documents];

  if (typeSelected.length !== 0) {
    results = results.filter((doc) => {
      return typeSelected.some(
        (selected) => selected.value === doc.documenttypes
      );
    });
  }
  if (classificationSelected.length !== 0) {
    results = results.filter((doc) => {
      return classificationSelected.some(
        (selected) => selected.value === doc.documentclassification
      );
    });
  }
  if (search !== "") {
    results = results.filter((doc) =>
      doc.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este documento?")) {
      dispatch(documentDelete({ id, token: userInfo.token }));
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

  const renderDocuments = () => {
    // Ordeno los documentos por ID antes de renderizarlos
    const sortedDocuments = results.sort((a, b) => b.id - a.id);
    return sortedDocuments.map((doc) => {
      const user = users.find((user) => user.user_name === doc.user);
      const type = documenttypes.find((type) => type.id === doc.documenttypes);

      const classification = documentclassification.find(
        (classification) => classification.id === doc.documentclassification
      );

      return (
        <Document
          key={doc.id}
          id={doc.id}
          title={doc.title}
          author={doc.author}
          description={doc.description}
          type={type ? String(type.description) : String(doc.documenttypes)}
          classification={
            classification
              ? String(classification.description)
              : String(doc.documentclassification)
          }
          user={doc.user}
          email={user ? user.email : ""}
          userInfo={userInfo}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={doc.data}
          date={formatDate(doc.date)}
          onDelete={() => handleDelete(doc.id)}
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
          <div className="mb-3 mt-3 mr-5 flex justify-end">
            <animated.input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Buscar"
              className="block min-w-0 rounded border bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-800 dark:focus:border-primary"
              id="search"
              style={{ ...fadeIn, ...scale }}
            />
            <div className="ml-1">
              <Select
                isMulti
                placeholder="Tipo"
                options={documenttypes.map((type) => ({
                  value: type.id,
                  label: type.description,
                }))}
                onChange={(e) => {
                  setTypeSelected(e);
                }}
                components={animatedComponets}
                className="w-full rounded border bg-transparent text-base font-normal text-neutral-700 dark:border-neutral-600 dark:text-neutral-800"
              />
            </div>
            <div className="ml-1">
              <Select
                isMulti
                placeholder="Clasificación"
                options={documentclassification.map((type) => ({
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

          <div className="container mx-auto p-4">
            {["admin", "editor"].includes(userInfo.role) && (
              <div className="mb-4 flex justify-start">
                <a
                  href="/createDocument"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                  title="Añadir Documento"
                >
                  <AiFillPlusSquare
                    className="text-green-900 hover:text-gray-900"
                    size={30}
                  />
                </a>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderDocuments()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;
