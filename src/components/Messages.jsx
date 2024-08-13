import { MegaphoneIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Alert } from "@material-tailwind/react";
import { Transition } from "@headlessui/react";

export default function Messages({ children }) {
  const getMessage = (message) => {
    switch (message) {
      case "Given token not valid for any token type":
        return "El token que has proporcionado ha expirado. Por favor, vuelve a iniciar sesión para continuar.";
      case "Network Error":
        return "Error de red, por favor, revise su conexión.";
      case "No active account found with the given credentials":
        return "No se ha encontrado ninguna cuenta activa con las credenciales ingresadas. Por favor, verifica tu información e inténtalo de nuevo.";
      case "You do not have permission to perform this action.":
        return "No tienes permiso para realizar esta acción.";
      case "Request failed with status code 500":
        return "La solicitud ha fallado. Por favor, inténtelo de nuevo más tarde o contacte con el soporte técnico.";
      case "Request failed with status code 400":
        return "La solicitud ha fallado con el código de estado 400. Por favor, verifica los datos ingresados y vuelve a intentarlo.";
      default:
        return message;
    }
  };

  return (
    <Transition
      show={true}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
    >
      <div className="bg-indigo-600">
        <div className="container mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="flex rounded-lg bg-indigo-800 p-2">
                <MegaphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <Alert className="ml-3 truncate font-medium text-white">
                <span className="hidden md:inline">{getMessage(children)}</span>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

Messages.propTypes = {
  children: PropTypes.string.isRequired,
};
