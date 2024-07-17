import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  documentDetails,
  documentUpdate,
  documentCreate,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";

export default function DocumentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [type, setTypeId] = useState(1);
  const [classification, setClassificationId] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const {
    documentInfo,
    error,
    loading,
    documenttypes,
    documentclassification,
  } = useSelector((state) => state.document);

  const { userInfo } = useSelector((state) => state.user);

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      documenttypes: type,
      documentclassification: classification,
      token: userInfo.token,
    };

    if (data && data instanceof File) {
      payload.data = data;
    }

    if (id) {
      payload.id = id;
      dispatch(documentUpdate(payload));
    } else {
      dispatch(documentCreate(payload));
    }

    navigate("/documents");
  };

  useEffect(() => {
    dispatch(documenttypesList({ token: userInfo.token }));
    dispatch(documentclassificationList({ token: userInfo.token }));

    if (id && Number(id) !== documentInfo.id) {
      dispatch(documentDetails({ id, token: userInfo.token }));
    } else {
      if (!isEmpty(documentInfo)) {
        setTitle(documentInfo.title);
        setDescription(documentInfo.description);
        setTypeId(documentInfo.documenttypes);
        setClassificationId(documentInfo.documentclassification);
        setData(documentInfo.data);
      }
    }
  }, [dispatch, id, userInfo, documentInfo]);

  return (
    <>
      {loading && <Loader />}
      {error && <Messages>{error}</Messages>}
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
        <label className="block text-sm font-bold">Título:</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Escribe un título"
          autoFocus
        />
        <label>
          Descripción:
          <textarea
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            placeholder="Escribe una descripción"
          />
        </label>

        <input
          type="file"
          name="file"
          onChange={(e) => setData(e.target.files[0])}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        />

        <select
          name="type"
          onChange={(e) => setTypeId(e.target.value)}
          value={type}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        >
          {documenttypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.description}
            </option>
          ))}
        </select>

        <select
          name="classification"
          onChange={(e) => setClassificationId(e.target.value)}
          value={classification}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        >
          {documentclassification.map((classification) => (
            <option key={classification.id} value={classification.id}>
              {classification.description}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-indigo-600 px-2 py-1">
          Enviar
        </button>
      </form>
    </>
  );
}
