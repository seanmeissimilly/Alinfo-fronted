import { blogCreate } from "../redux/blogSlice";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { blogUpdate, blogDetails } from "../redux/blogSlice";
import { useParams } from "react-router-dom";
import { Input, Textarea, Button } from "@material-tailwind/react";

export default function BlogForm() {
  const URL_API = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const dispatch = useDispatch();

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(
    `${URL_API}/media/blog_picture/noticia.jpg`
  );

  const navigate = useNavigate();
  const path = "/forum";

  const blog = useSelector((state) => state.blog);
  const { error, loading, blogInfo, success } = blog;

  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  useEffect(() => {
    if (id && blogInfo.id !== Number(id)) {
      dispatch(blogDetails({ id, token: userInfo.token }));
    } else {
      if (!image && !isEmpty(blogInfo)) {
        setBody(blogInfo.body);
        setTitle(blogInfo.title);
        setImage(blogInfo.image);
        setImageUrl(`${URL_API}${blogInfo.image}`);
      }
    }
  }, [dispatch, blogInfo, id, success, userInfo, URL_API, image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, body, token: userInfo.token };
    if (image && image instanceof File) {
      payload.image = image;
    }
    if (id) {
      payload.id = id;
      dispatch(blogUpdate(payload));
    } else {
      dispatch(blogCreate(payload));
    }

    navigate(path),
      toast.success(id ? "Publicación Editada" : "Publicación Añadida", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
  };

  const maxTitleLength = 150;
  const maxBodyLength = 500;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="md:col-span-1"></div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                {id ? "Editar Publicación" : "Añadir Publicación"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md mb-20 mt-4">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2"></div>
                    </div>

                    <div className="mt-1">
                      <Input
                        label="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        required
                        type="text"
                        id="title"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Título de la publicación"
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

                    <div className="mt-1">
                      <Textarea
                        label="Descripción"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        type="text"
                        name="body"
                        id="body"
                        rows={3}
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        required
                        error={body.length > maxBodyLength}
                      />
                      <p
                        className={`text-sm ${
                          body.length > maxBodyLength
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {body.length}/{maxBodyLength}
                      </p>
                    </div>

                    <div className="mt-1">
                      <Input
                        label="Imagen"
                        onChange={handleImageChange}
                        name="image"
                        type="file"
                        id="image"
                        accept="image/*"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />

                      {imageUrl && (
                        <div className="mt-4">
                          <img
                            src={imageUrl}
                            alt="Selected"
                            className="h-48 w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
