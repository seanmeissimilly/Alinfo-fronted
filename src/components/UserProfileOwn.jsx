import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { blogDelete, blogList } from "../redux/blogSlice";
import moment from "moment/moment.js";
import { Button } from "@material-tailwind/react";

export default function UserProfileOwn() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);
  const { blogs, success, blogInfo } = blog;

  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  useEffect(() => {
    dispatch(blogList(userInfo));
  }, [dispatch, success, userInfo, blogInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta publicación?")) {
      dispatch(blogDelete({ id, token: userInfo.token }));
    }
  };

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <center>
            <img
              className="h-40 w-55 rounded-full"
              src={`${URL}${userInfo.image}`}
              alt=""
            />

            <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
              {userInfo.user_name}
              <Button
                color="indigo"
                size="sm"
                className="ml-4"
                onClick={() =>
                  (window.location.href = "/miPerfil/editProfile/")
                }
              >
                Editar Perfil
              </Button>
            </h3>
          </center>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Información de Usuario
          </p>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nombre de Usuario
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userInfo.user_name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Correo Electrónico
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <a
                  href={`mailto:${userInfo.email}`}
                  style={{
                    color: "blue",
                    textDecoration: "none",
                    borderBottom: "1px dotted blue",
                  }}
                >
                  {userInfo.email}
                </a>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Rol de Usuario
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userInfo.role === "reader"
                  ? "Lector"
                  : userInfo.role === "editor"
                  ? "Editor"
                  : "Administrador"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Acerca de ti
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userInfo.bio}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <h2 className="mt-6 mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        {userInfo.role === "reader" ? "" : " -- Publicaciones --"}
      </h2>

      {blogs.map((blog_element) => (
        <>
          {userInfo.user_name === blog_element.user && (
            <div className="py-16 bg-gray-200">
              <div className=" px-10">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                  <div className="md:flex">
                    <div className="w-full">
                      <div
                        key={blog_element.id}
                        className="flex justify-between items-center m-8"
                      >
                        <div className="flex flex-row items-center">
                          <img
                            src={`${URL}${userInfo.image}`}
                            className="rounded-full"
                            width="40"
                          />
                          <div className="flex flex-row items-center ml-2">
                            <span className="font-bold mr-1">
                              {blog_element.user}
                            </span>
                          </div>
                        </div>
                      </div>

                      <img
                        src={`${URL}${blog_element.image}`}
                        className="w-full object-cover rounded-md object-center"
                      />
                      <div className="p-4 flex justify-start items-center text-xl">
                        <p className="font-bold text-start">
                          {blog_element.title}
                        </p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <p>{blog_element.body}</p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex flex-row">
                          <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {formatDate(blog_element.date)}
                          </p>
                        </div>

                        <div className="flex flex-row items-center">
                          <Button
                            variant="filled"
                            color="indigo"
                            className="group mx-4 relative flex justify-center rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() =>
                              (window.location.href = `/forum/editBlog/${blog_element.id}`)
                            }
                          >
                            <AiFillEdit size={20} />
                            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                              Editar
                            </span>
                          </Button>

                          <Button
                            variant="filled"
                            color="indigo"
                            className="group relative flex justify-center rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
                            onClick={() => deleteHandler(blog_element.id)}
                          >
                            <BsFillTrashFill size={20} />
                            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                              Borrar
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
