import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import user_icon from "../media/user.png";
import { toast } from "react-hot-toast";
import { userLogin } from "../redux/userSlice.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openpassword, setOpenPassword] = useState(false);

  const handleshowpassword = () => {
    setOpenPassword(!openpassword);
  };

  const disptach = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo, loading, error } = user;

  const navigate = useNavigate();
  const path = "/";

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      //todo Redirigo la página y mando una notificación a la pantalla.
      navigate(path),
        toast.success("Sección iniciada", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
    }
  }, [navigate, userInfo]);

  function submitHandler(e) {
    e.preventDefault();
    disptach(userLogin({ email, password }));
  }

  return (
    <>
      {error && <Messages>{error}</Messages>}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={user_icon}
                alt="CUJAE"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Iniciar sesión en su cuenta
              </h2>
            </div>
            <form
              onSubmit={submitHandler}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="my-8">
                  <label htmlFor="email-address" className="sr-only">
                    Dirección de correo electrónico
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Correo Electrónico"
                  />
                </div>
                <div className="my-8">
                  <div className=" mx-auto relative flex items-center">
                    <label htmlFor="password" className="sr-only">
                      Contraseña
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type={openpassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                    <div className="text-2xl absolute right-3">
                      {!openpassword ? (
                        <AiFillEye onClick={handleshowpassword} />
                      ) : (
                        <AiFillEyeInvisible onClick={handleshowpassword} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Registrarse
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
