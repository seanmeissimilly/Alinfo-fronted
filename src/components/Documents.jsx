import React, { useEffect } from "react";
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

const Documents = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

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

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este documento?")) {
      dispatch(documentDelete({ id, token: userInfo.token }));
    }
  };

  const renderDocuments = () => {
    // Hago una copia y ordeno los documentos por ID antes de renderizarlos
    const sortedDocuments = [...documents].sort((a, b) => a.id - b.id);
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
          description={doc.description}
          type={type ? String(type.description) : String(doc.documenttypes)}
          classification={
            classification
              ? String(classification.description)
              : String(doc.documentclassification)
          }
          user={doc.user}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={doc.data}
          date={doc.date.substring(0, 10)}
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
      )}
    </>
  );
};

export default Documents;
