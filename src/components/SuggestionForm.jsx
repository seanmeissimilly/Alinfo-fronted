import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  suggestionDetails,
  suggestionUpdate,
  suggestionCreate,
} from "../redux/suggestionSlice.js";
import { toast } from "react-hot-toast";
import { Switch, Input } from "@material-tailwind/react";

export default function SuggestionForm() {
  const [title, setTitle] = useState("");
  const [resolved, setResolved] = useState(false);
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { suggestionInfo, error, loading } = useSelector(
    (state) => state.suggestion
  );

  const { userInfo } = useSelector((state) => state.user);

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      resolved,
      body,
      token: userInfo.token,
    };

    if (id) {
      payload.id = id;
      dispatch(suggestionUpdate(payload));
    } else {
      dispatch(suggestionCreate(payload));
    }

    navigate(
      "/suggestions",
      toast.success(`Bienvenido a Quejas o Sugerencias`, {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      })
    );
  };

  useEffect(() => {
    if (id && Number(id) !== suggestionInfo.id) {
      dispatch(suggestionDetails({ id, token: userInfo.token }));
    } else {
      if (!isEmpty(suggestionInfo)) {
        setTitle(suggestionInfo.title);
        setResolved(suggestionInfo.resolved);
        setBody(suggestionInfo.body);
      }
    }
  }, [dispatch, id, userInfo, suggestionInfo]);

  const handleSwitchChange = () => {
    setResolved(!resolved);
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Messages>{error}</Messages>}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="shadow sm:overflow-hidden sm:rounded-md mb-20 mt-6"
        >
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {id ? "Editar Queja o Sugerencia" : "Crear Queja o Sugerencia"}
          </h2>
          <div className="space-y-6 px-4 py-5 sm:p-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Título:
              </label>
              <Input
                variant="static"
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
                htmlFor="body"
                className="block text-sm font-medium text-gray-700"
              >
                Resumen:
              </label>
              <textarea
                type="text"
                name="body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                placeholder="Escribe una resumen"
              />
            </div>
            <div className="flex items-center">
              <Switch
                id="resolved"
                label="Estado"
                checked={resolved}
                onChange={handleSwitchChange}
                ripple={true}
                className="h-full w-full checked:bg-[#3ea54d]"
                containerProps={{
                  className: "w-11 h-6",
                }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
              />
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
