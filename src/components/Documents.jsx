import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { documentList, documentDelete } from "../redux/documentSlice";
import { userList } from "../redux/userSlice.js";
import Document from "./Document";

function Documents() {
  // Declaro la URL de la API en dependencia del entorno
  const URL =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:8000";
  const dispatch = useDispatch();

  const document = useSelector((state) => state.document);
  const {
    error: documentError,
    loading: documentLoading,
    documents,
    success: documentSuccess,
  } = document;

  const user = useSelector((state) => state.user);
  const { users, userInfo, success: userSuccess } = user;

  useEffect(() => {
    dispatch(documentList({ token: userInfo.token }));
    dispatch(userList({ token: userInfo.token }));
  }, [dispatch, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este documento?")) {
      dispatch(documentDelete({ id, token: userInfo.token }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((doc) => {
          const user = users.find((user) => user.user_name === doc.user);
          return (
            <Document
              key={doc.id}
              id={doc.id}
              title={doc.title}
              description={doc.description}
              type={doc.documenttypes}
              classification={doc.documentclassification}
              user={doc.user}
              userImage={user ? `${URL}${user.image}` : ""}
              userRole={user ? user.role : "reader"}
              data={doc.data}
              date={doc.date.substring(0, 10)}
              onDelete={() => handleDelete(doc.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Documents;
