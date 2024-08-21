import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { FaLock, FaUnlock } from "react-icons/fa";
import user_icon from "../media/user.png";
import { toast } from "react-hot-toast";
import { userLogin } from "../redux/userSlice.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

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
  const path = "/forum";

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

  //validar el correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      {error && <Messages>{error}</Messages>}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-10">
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="white"
              className="mb-4 grid h-28 place-items-center"
            >
              <img
                className="mx-auto h-12 w-auto"
                src={user_icon}
                alt="CUJAE"
              />

              <Typography variant="h4" color="black">
                Iniciar sesión en su cuenta
              </Typography>
            </CardHeader>

            <form onSubmit={submitHandler} action="#" method="POST">
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                  placeholder="Correo Electrónico"
                  size="lg"
                />
                <div className="relative">
                  <Input
                    label="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type={openpassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                    placeholder="Contraseña"
                    size="lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-2xl">
                    {!openpassword ? (
                      <AiFillEye onClick={handleshowpassword} />
                    ) : (
                      <AiFillEyeInvisible onClick={handleshowpassword} />
                    )}
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white hover:bg-teal-900  focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {isValidEmail(email) && password !== "" ? (
                      <FaUnlock
                        className="h-6 w-6 text-indigo-200 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaLock
                        className="h-6 w-6 text-indigo-200 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  Entrar
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  ¿No tienes una cuenta?
                  <Typography
                    as="a"
                    href="/register"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                  >
                    Registrarse
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
