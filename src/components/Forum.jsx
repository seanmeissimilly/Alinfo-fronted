import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { userList } from "../redux/userSlice.js";
import { blogList } from "../redux/blogSlice";
import { AiFillPlusSquare } from "react-icons/ai";

export default function Forum() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);
  const { error, loading, blogs, blogInfo } = blog;

  const user = useSelector((state) => state.user);
  const { users, userInfo } = user;

  useEffect(() => {
    dispatch(blogList({ token: userInfo.token }));
    dispatch(userList({ token: userInfo.token }));
  }, [dispatch, userInfo, blogInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="py-10 bg-gray-200">
          {["admin", "editor"].includes(userInfo.role) && (
            <a
              href="/addBlog"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              title="Añadir Publicación"
            >
              <AiFillPlusSquare
                className="ml-6 text-green-900 hover:text-gray-900 "
                size={30}
              />
            </a>
          )}

          {blogs &&
            blogs.map((blog) => (
              <div key={blog.id} className="py-8">
                <div className="max-w-md mx-auto  bg-white shadow-lg rounded-md overflow-hidden md:max-w-md">
                  <div className="md:flex">
                    <div className="w-full">
                      <div className="flex justify-between items-center m-8">
                        <div className="flex flex-row items-center">
                          {users &&
                            users.map((user) => (
                              <div key={user.id}>
                                {user.user_name === blog.user && (
                                  <div className="flex flex-row items-center ml-2">
                                    <img
                                      src={`${URL}${user.image}`}
                                      className="rounded-full"
                                      width="40"
                                    />
                                    <span className="font-bold mr-1 ml-2">
                                      {user.user_name}
                                    </span>
                                    <small className="h-1 w-1 bg-gray-300 rounded-full mr-1 mt-1"></small>
                                    <a
                                      style={{ textDecoration: "none" }}
                                      href={`/userProfile/${user.id}`}
                                      className="text-blue-600 text-sm hover:text-blue-800"
                                    >
                                      Ver Perfil
                                    </a>
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <img
                        src={`${URL}${blog.image}`}
                        className="w-full object-cover rounded-md"
                      />
                      <div className="p-4 flex justify-center items-center text-xl">
                        <p className="font-bold text-center">{blog.title}</p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <p>{blog.body}</p>
                      </div>

                      <div className="p-4 flex justify-between items-center">
                        <div className="flex flex-row items-center ">
                          <a
                            style={{ textDecoration: "none" }}
                            href={`/soloBlog/${blog.id}`}
                            className="group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Ver más
                          </a>
                          <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {blog.date.substring(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
