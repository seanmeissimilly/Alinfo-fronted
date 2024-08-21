import { useState, useEffect } from "react";
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
import { Input, Textarea, Button } from "@material-tailwind/react";

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
  const path = "/videos";

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

    navigate(path),
      toast.success(id ? "Video Editado" : "Video Añadido", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
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

  const maxTitleLength = 150;
  const maxDescriptionLength = 500;

  return (
    <>
      {loading && <Loader />}
      {error && <Messages>{error}</Messages>}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="shadow sm:overflow-hidden sm:rounded-md mb-20 mt-20"
        >
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {id ? "Editar Video" : "Crear Video"}
          </h2>
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <Input
                label="Título"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                placeholder="Escribe un título"
                autoFocus
                required
                error={title.length > maxTitleLength}
              />
              <p
                className={`text-sm ${
                  title.length > maxTitleLength
                    ? "text-red-500"
                    : "text-gray-500"
                } mt-2`}
              >
                {title.length}/{maxTitleLength}
              </p>
            </div>
            <div>
              <Textarea
                label="Descripción"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                required
                error={description.length > maxDescriptionLength}
              />
              <p
                className={`text-sm ${
                  description.length > maxDescriptionLength
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {description.length}/{maxDescriptionLength}
              </p>
            </div>
            <div>
              <Input
                label="Archivo"
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
            <Button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
