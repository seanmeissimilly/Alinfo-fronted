import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSolo } from "../redux/userSlice.js";
import { blogList } from "../redux/blogSlice";
import Messages from "./Messages";
import Loader from "./Loader";
import moment from "moment/moment.js";

export default function UserProfile() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);
  const { error: errorBlog, loading: blogLoading, blogs } = blog;

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo, userOnly } = user;

  useEffect(() => {
    dispatch(userSolo({ id, token: userInfo.token }));
    dispatch(blogList({ token: userInfo.token }));
  }, [dispatch, id, userInfo]);

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  return (
    <>
      {blogLoading && <Loader />}
      {errorBlog && <Messages variant="danger">{errorBlog}</Messages>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <center>
                <img
                  className="h-40 w-55 rounded-full"
                  src={`${URL}${userOnly.image}`}
                  alt=""
                />
                <br></br>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {userOnly.user_name} &nbsp;&nbsp;&nbsp;&nbsp;
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
                    {userOnly.user_name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Correo Electrónico
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userOnly.email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Rol de Usuario
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userOnly.role === "reader"
                      ? "Lector"
                      : userOnly.role === "editor"
                      ? "Editor"
                      : "Administrador"}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Acerca de ti
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userOnly.bio}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <h2 className="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            -- Publicaciones --
          </h2>

          {blogs.map((blog) => (
            <>
              {userOnly.user_name === blog.user && (
                <div className="py-20 bg-gray-200">
                  <div className=" px-10">
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                      <div className="md:flex">
                        <div className="w-full">
                          <div
                            key={blog.id}
                            className="flex justify-between items-center m-8"
                          >
                            <div className="flex flex-row items-center">
                              <img
                                src={`${URL}${userOnly.image}`}
                                className="rounded-full"
                                width="40"
                              />
                              <div className="flex flex-row items-center ml-2">
                                <span className="font-bold mr-1">
                                  {blog.user}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="">
                            <img
                              src={`${URL}${blog.image}`}
                              className="w-full object-cover rounded-md"
                            />

                            <div className="p-4 flex justify-start items-center text-xl">
                              <p className="font-bold text-start">
                                {blog.title}
                              </p>
                            </div>

                            <div className="p-4 flex justify-between items-center">
                              <p>{blog.body}</p>
                            </div>
                          </div>
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex flex-row">
                              <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                {formatDate(blog.date)}
                              </p>
                            </div>
                            <div className="flex flex-row items-center">
                              <a
                                href={`/soloBlog/${blog.id}`}
                                className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Ver más
                              </a>
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
      )}
    </>
  );
}
