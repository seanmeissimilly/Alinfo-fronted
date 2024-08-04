import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  createComment,
  blogDetails,
  createCommentReset,
  deleteComment,
} from "../redux/blogSlice.js";
import { userList } from "../redux/userSlice.js";
import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment/moment.js";

export default function BlogSolo() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const blog = useSelector((state) => state.blog);
  const { success_comment, loading, error, blogInfo } = blog;

  const user = useSelector((state) => state.user);
  const { users, userInfo } = user;

  useEffect(() => {
    if (success_comment) {
      setText("");
      dispatch(createCommentReset());
    }
    dispatch(userList({ token: userInfo.token }));
    dispatch(blogDetails({ id: id, token: userInfo.token }));
  }, [dispatch, userInfo, id, success_comment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment({ id, text, token: userInfo.token }));
  };

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  const deleteHandlerComment = (comment_id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta comentario?")) {
      dispatch(deleteComment({ comment_id, token: userInfo.token }));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
          <div>
            <div className="py-10 bg-gray-200">
              <div className="py-8">
                <div className="max-w-md mx-auto  bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                  <div className="md:flex">
                    <div className="w-full">
                      <div className="flex justify-between items-center m-8">
                        <div className="flex flex-row items-center">
                          {users &&
                            users.map((u) => (
                              <div key={u.id}>
                                {u.user_name === blogInfo.user && (
                                  <>
                                    <div className="flex flex-row items-center ml-2">
                                      <img
                                        src={`${URL}${u.image}`}
                                        className="rounded-full"
                                        width="40"
                                      />
                                      <span className="font-bold mr-1 ml-2">
                                        {blogInfo.user}
                                      </span>
                                      <small className="h-1 w-1 bg-gray-300 rounded-full mr-1 mt-1"></small>
                                      <a
                                        style={{ textDecoration: "none" }}
                                        href={`/userProfile/${u.id}`}
                                        className="text-blue-600 text-sm hover:text-blue-800"
                                      >
                                        Ver Perfil
                                      </a>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <img
                        src={`${URL}${blogInfo.image}`}
                        className="w-full rounded-md object-cover object-center"
                      />
                      <div className="p-4 flex justify-center items-center text-xl">
                        <p className="font-bold text-center">
                          {blogInfo.title}
                        </p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <p>{blogInfo.body}</p>
                      </div>

                      <div className="p-4 flex justify-between items-center">
                        <div className="flex flex-row items-center ">
                          <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {formatDate(blogInfo.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-6 mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Comentarios
            </h2>

            <form onSubmit={submitHandler}>
              <div>
                <div className="mt-1 p-4">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    id="text"
                    rows={3}
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Escribe Aquí"
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

            {blogInfo.comments &&
              [...blogInfo.comments]
                .sort((a, b) => a.id - b.id)
                .map((comment) => (
                  <div key={comment.id} className="flex justify-center">
                    <>
                      {users &&
                        users.map((user) => (
                          <div key={user.id} className="py-6">
                            {user.user_name === comment.user && (
                              <div className="py-6">
                                <div>
                                  <img
                                    className="object-cover w-24 h-24 rounded-full shadow"
                                    src={`${URL}${user.image}`}
                                    alt="Person"
                                  />
                                  <div className="flex flex-col justify-center mt-2">
                                    <p className="text-lg font-bold">
                                      {comment.user}
                                    </p>
                                    <p className="mb-4 text-xs text-gray-800">
                                      {formatDate(comment.date)}
                                    </p>
                                    <p className="text-sm tracking-wide text-gray-800">
                                      {comment.text}
                                    </p>
                                  </div>
                                  {(userInfo.role === "admin" ||
                                    userInfo.email === user.email) && (
                                    <div className="flex justify-center mt-2 ml-auto">
                                      <button
                                        onClick={() =>
                                          deleteHandlerComment(comment.id)
                                        }
                                        className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      >
                                        <BsFillTrashFill size={20} />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                                          Borrar
                                        </span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </>
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
