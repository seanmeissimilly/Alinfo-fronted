import { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Checkbox } from "@material-tailwind/react";

const Suggestion = ({
  id,
  title,
  user,
  userInfo,
  body,
  resolved,
  date,
  userImage,
  userRole,
  onDelete,
  email,
}) => {
  const [showFullDescription, setShowFullBody] = useState(false);

  const toggleBody = () => {
    setShowFullBody(!showFullDescription);
  };
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between">
      <div className="p-4 flex-grow">
        <h2 className="mt-1 text-md font-semibold text-gray-900">{title}</h2>
        <div
          className={`mt-2 text-gray-600 whitespace-pre-line ${
            showFullDescription ? "" : "max-h-20 overflow-hidden"
          }`}
        >
          {body}
        </div>
        {body.length > 100 && (
          <button
            onClick={toggleBody}
            className="text-blue-600 hover:text-blue-900 mt-1"
          >
            {showFullDescription ? "Ver menos" : "Ver más"}
          </button>
        )}
        <div className="mt-3">
          <div className="mt-1">
            <Checkbox
              id="resolved"
              color="green"
              label={resolved ? "Resuelto" : "No Resuelto"}
              ripple={true}
              readOnly
              checked={resolved}
            />
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Fecha de subida: </span>
            <span className="text-gray-900 font-bold">{date}</span>
          </div>
          <div className="mt-3 flex items-center">
            <span className="text-gray-700">Subido por: </span>
            <img
              src={userImage}
              className="rounded-full mx-2"
              width="30"
              alt="User"
            />
            <span className="font-bold">{user}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-4">
        {(userRole === "admin" || email === userInfo.email) && (
          <div className="flex space-x-2">
            <a
              href={`/suggestions/editSuggestion/${id}`}
              className="text-blue-600 hover:text-blue-900 relative group"
            >
              <FaEdit />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Editar
              </span>
            </a>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-900 relative group"
            >
              <FaTrash />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Borrar
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Suggestion.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
  resolved: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Suggestion;