import { Fragment } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverGroup,
  Transition,
  MenuButton,
  MenuItem,
  PopoverPanel,
  MenuItems,
  Menu,
  PopoverButton,
} from "@headlessui/react";
import { AiFillHome, AiFillProduct } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import logo_cujae from "../media/logo_cujae.png";
import { MdForum } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { userLogout } from "../redux/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

//todo: Declaro la url de la Api en dependencia del entorno
const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

export default function Header() {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(userLogout());

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/landing" title="Página Inicial">
              <img className="h-12 w-auto sm:h-12" src={logo_cujae} alt="" />
            </a>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Abrir Menú</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>

          {!isEmpty(userInfo) ? ( //!Reviso si userInfo está vacio.
            <>
              <PopoverGroup as="nav" className="hidden space-x-10 md:flex">
                <a
                  href="/"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Inicio"
                >
                  <AiFillHome size={30} />
                </a>
                <a
                  href="/forum"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Foro"
                >
                  <MdForum size={30} />
                </a>
                <a
                  href="/documents"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Documentos"
                >
                  <IoDocumentSharp size={30} />
                </a>
                <a
                  href="/videos"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Videos"
                >
                  <MdVideoLibrary size={30} />
                </a>
                <a
                  href="/tools"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Herramientas"
                >
                  <AiFillProduct size={30} />
                </a>
                <a
                  href="/suggestions"
                  className="text-base font-medium text-green-800 hover:text-gray-900"
                  title="Quejas o Sugerencias"
                >
                  <RiMessage2Fill size={30} />
                </a>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Abrir Menú de Usuario</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`${URL}${userInfo.image}`}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ isActive }) => (
                          <a
                            style={{ textDecoration: "none" }}
                            href="/miPerfil"
                            className={classNames(
                              isActive ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Mi Perfil
                          </a>
                        )}
                      </MenuItem>

                      {(userInfo.role === "editor" ||
                        userInfo.role === "admin") && (
                        <MenuItem>
                          {({ isActive }) => (
                            <a
                              style={{ textDecoration: "none" }}
                              href="/reports"
                              className={classNames(
                                isActive ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Reportes
                            </a>
                          )}
                        </MenuItem>
                      )}

                      <MenuItem>
                        {({ isActive }) => (
                          <a
                            onClick={logoutHandler}
                            style={{ textDecoration: "none" }}
                            className={classNames(
                              isActive ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Salir
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </PopoverGroup>
            </>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Entrar
              </a>

              <a
                href="/register"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Registrarse
              </a>
            </div>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="space-y-6 py-6 px-5">
              {!isEmpty(userInfo) ? (
                <>
                  <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                    <a
                      href="/"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Inicio"
                    >
                      <AiFillHome size={30} />
                    </a>
                    <a
                      href="/forum"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Foro"
                    >
                      <MdForum size={30} />
                    </a>
                    <a
                      href="/documents"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Documentos"
                    >
                      <IoDocumentSharp size={30} />
                    </a>
                    <a
                      href="/videos"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Videos"
                    >
                      <MdVideoLibrary size={30} />
                    </a>
                    <a
                      href="/tools"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Herramientas"
                    >
                      <AiFillProduct size={30} />
                    </a>
                    <a
                      href="/suggestions"
                      className="text-base font-medium text-green-800 hover:text-gray-900"
                      title="Quejas o Sugerencias"
                    >
                      <RiMessage2Fill size={30} />
                    </a>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton
                          className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          title="Perfil de Usuario"
                        >
                          <span className="sr-only">Abrir Menú de Usuario</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`${URL}${userInfo.image}`}
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            {({ isActive }) => (
                              <a
                                style={{ textDecoration: "none" }}
                                href="/miPerfil"
                                className={classNames(
                                  isActive ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Mi Perfil
                              </a>
                            )}
                          </MenuItem>

                          {(userInfo.role === "editor" ||
                            userInfo.role === "admin") && (
                            <MenuItem>
                              {({ isActive }) => (
                                <a
                                  style={{ textDecoration: "none" }}
                                  href="/reports"
                                  className={classNames(
                                    isActive ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Reportes
                                </a>
                              )}
                            </MenuItem>
                          )}
                          <MenuItem>
                            {({ isActive }) => (
                              <a
                                onClick={logoutHandler}
                                style={{ textDecoration: "none" }}
                                className={classNames(
                                  isActive ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Salir
                              </a>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </>
              ) : (
                <div>
                  <a
                    href="/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Registrarse
                  </a>

                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <a
                      href="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Entrar
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
