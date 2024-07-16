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

const Documents = () => {
  const URL =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:8000";
  const dispatch = useDispatch();

  const { documents, documenttypes, documentclassification } = useSelector(
    (state) => state.document
  );
  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(documentList({ token: userInfo.token }));
      dispatch(documenttypesList({ token: userInfo.token }));
      dispatch(documentclassificationList({ token: userInfo.token }));
      dispatch(userList({ token: userInfo.token }));
    }
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
          const type = documenttypes.find(
            (type) => type.id === doc.documenttypes
          );
          const classification = documentclassification.find(
            (classification) => classification.id === doc.documentclassification
          );
          return (
            <Document
              key={doc.id}
              id={doc.id}
              title={doc.title}
              description={doc.description}
              type={type ? type.description : doc.documenttypes}
              classification={
                classification
                  ? classification.description
                  : doc.documentclassification
              }
              user={doc.user}
              userImage={user ? `${URL}${user.image}` : ""}
              userRole={userInfo ? userInfo.role : "reader"}
              data={doc.data}
              date={doc.date.substring(0, 10)}
              onDelete={() => handleDelete(doc.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
