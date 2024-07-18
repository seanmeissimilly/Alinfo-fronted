import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  multimediaDetails,
  multimediaCreate,
  multimediaUpdate,
  multimediaclassificationList,
} from "../redux/multimediaSlice";
import { toast } from "react-hot-toast";

export default function VideoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [classification, setClassificationId] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { multimediaclassification, multimediaInfo, error, loading } =
    useSelector((state) => state.multimedia);

  const { userInfo } = useSelector((state) => state.user);

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      multimediaclassification: classification,
      token: userInfo.token,
    };

    if (data && data instanceof File) {
      payload.data = data;
    }

    if (id) {
      payload.id = id;
      dispatch(multimediaUpdate(payload));
    } else {
      dispatch(multimediaCreate(payload));
    }

    navigate(
      "/videos",
      toast.success(`Bienvenido a Videos`, {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      })
    );
  };

  useEffect(() => {
    dispatch(multimediaclassificationList({ token: userInfo.token }));

    if (id && Number(id) !== multimediaInfo.id) {
      dispatch(multimediaDetails({ id, token: userInfo.token }));
    } else {
      if (!isEmpty(multimediaInfo)) {
        setTitle(multimediaInfo.title);
        setDescription(multimediaInfo.description);
        setClassificationId(multimediaInfo.multimediaclassification);
        setData(multimediaInfo.data);
      }
    }
  }, [dispatch, id, userInfo, multimediaInfo]);

  return (
    <>
      {loading && <Loader />}
      {error && <Messages>{error}</Messages>}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="shadow sm:overflow-hidden sm:rounded-md"
        >
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {id ? "Editar Video" : "Crear Video"}
          </h2>
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Título:
              </label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                placeholder="Escribe un título"
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción:
              </label>
              <textarea
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                placeholder="Escribe una descripción"
              />
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Archivo
              </label>
              <input
                type="file"
                name="file"
                onChange={(e) => setData(e.target.files[0])}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="classification"
                className="block text-sm font-medium text-gray-700"
              >
                Clasificación
              </label>
              <select
                name="classification"
                onChange={(e) => setClassificationId(e.target.value)}
                value={classification}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
              >
                {multimediaclassification.map((classification) => (
                  <option key={classification.id} value={classification.id}>
                    {classification.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
