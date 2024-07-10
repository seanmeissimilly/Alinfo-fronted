import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import Messages from "./Messages";
import u from "../media/user.png";
import { toast } from "react-hot-toast";

export default function Register() {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo, loading, error } = user;

  const navigate = useNavigate();
  const path = "/";

  useEffect(() => {
    if (userInfo.length !== 0) {
      //Redirigo la página y mando una notificación a la pantalla.
      navigate(path),
        toast.success("Registro Satisfactorio", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas deben coincidir");
    } else {
      // dispatch(register(user_name, email, password));
    }
  };

  return (
    <>
      {message && <Messages>{message}</Messages>}
      {error && <Messages>{error}</Messages>}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src={u} alt="Your Company" />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Registre su cuenta
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
                  <div className="my-8">
                    <label htmlFor="email-address" className="sr-only">
                      Nombre de usuario
                    </label>
                    <input
                      value={user_name}
                      onChange={(e) => setUser_name(e.target.value)}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Nombre de usuario"
                    />
                  </div>

                  <div className="">
                    <label htmlFor="email-address" className="sr-only">
                      Dirección de correo electrónico
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Correo Electrónico"
                    />
                  </div>

                  <div className="my-8">
                    <label htmlFor="password" className="sr-only">
                      Contraseña
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="my-8">
                    <label htmlFor="password" className="sr-only">
                      Confirmar Contraseña
                    </label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Entrar
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
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
