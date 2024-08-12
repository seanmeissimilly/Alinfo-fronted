import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { userList } from "../redux/userSlice.js";
import { blogList, blogDelete } from "../redux/blogSlice";
import { AiFillPlusSquare, AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useSpring, animated } from "react-spring";
import { DateTime } from "luxon";
import { Button } from "@material-tailwind/react";
import Modal from "./Modal";

export default function Forum() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);
  const { error, loading, blogs, blogInfo } = blog;

  const user = useSelector((state) => state.user);
  const { users, userInfo } = user;

  useEffect(() => {
    dispatch(blogList({ token: userInfo.token }));
    dispatch(userList({ token: userInfo.token }));
  }, [dispatch, userInfo, blogInfo]);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(blogDelete({ id: deleteId, token: userInfo.token }));
    setShowModal(false);
  };

  const formatDate = (date) => DateTime.fromISO(date).toFormat("dd-MM-yyyy");

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  const scale = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    delay: 500,
  });

  //metodo de filtrado
  const results =
    search === ""
      ? [...blogs]
      : [...blogs].filter((blog) =>
          blog.title.toLowerCase().includes(search.toLocaleLowerCase())
        );

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onConfirm={confirmDelete}>
          <p>¿Estás seguro de que deseas borrar esta publicación?</p>
          <p>Esta acción no se puede deshacer.</p>
        </Modal>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          <div className="mb-3 mt-3 mr-3 flex justify-end">
            <animated.input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Buscar"
              className="block min-w-0 rounded border border-solid bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-800 dark:focus:border-primary"
              id="search"
              style={{ ...fadeIn, ...scale }}
            />
          </div>
          <div className="py-10 bg-gray-200">
            {["admin", "editor"].includes(userInfo.role) && (
              <a
                href="/forum/addBlog"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="Añadir Publicación"
              >
                <AiFillPlusSquare
                  className="ml-6 text-green-900 hover:text-gray-900 "
                  size={30}
                />
              </a>
            )}

            {results?.map((blog) => (
              <div key={blog.id} className="py-8">
                <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                  <div className="md:flex">
                    <div className="w-full">
                      <div className="flex justify-between items-center m-8">
                        {users?.map((user) => (
                          <div key={user.id}>
                            {user.user_name === blog.user && (
                              <div className="">
                                <div className="flex flex-row items-center">
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
                                </div>
                                <div className="mt-4">
                                  <img
                                    src={`${URL}${blog.image}`}
                                    className="w-full object-cover rounded-md object-center"
                                  />
                                </div>
                                <div className="p-4 flex justify-center items-center text-xl">
                                  <p className="font-bold text-center">
                                    {blog.title}
                                  </p>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                  <p>{blog.body}</p>
                                </div>

                                <div className="p-4 flex justify-between items-center">
                                  <div className="flex flex-row  space-x-6">
                                    <Button
                                      color="indigo"
                                      className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
                                      onClick={() =>
                                        (window.location.href = `/forum/soloBlog/${blog.id}`)
                                      }
                                    >
                                      Ver más
                                    </Button>
                                    <p className="mb-2 mt-auto pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                      {formatDate(blog.date)}
                                    </p>
                                  </div>
                                  {(userInfo.role === "admin" ||
                                    (userInfo.role === "editor" &&
                                      userInfo.email === user.email)) && (
                                    <div className="p-4 flex justify-end items-center space-x-6">
                                      <Button
                                        color="indigo"
                                        className="group relative flex justify-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
                                        onClick={() =>
                                          (window.location.href = `/forum/editBlog/${blog.id}`)
                                        }
                                      >
                                        <AiFillEdit size={20} />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                                          Editar
                                        </span>
                                      </Button>
                                      <Button
                                        color="indigo"
                                        className="group relative flex justify-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 normal-case"
                                        onClick={() => handleDelete(blog.id)}
                                      >
                                        <BsFillTrashFill size={20} />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                                          Borrar
                                        </span>
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
