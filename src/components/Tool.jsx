import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const Tool = ({
  id,
  title,
  description,
  classification,
  user,
  userImage,
  data,
  userRole,
  onDelete,
  date,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
          {description}
        </div>
        {description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-600 hover:text-blue-900 mt-1"
          >
            {showFullDescription ? "Ver menos" : "Ver más"}
          </button>
        )}
        <div className="mt-3">
          <div className="mt-1">
            <span className="text-gray-700">Clasificación: </span>
            <span className="text-gray-900 font-bold">{classification}</span>
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
      <div className="flex items-center justify-between p-4">
        <a
          href={data}
          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-2 py-1 rounded flex items-center"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload className="mr-1" />
          <span className="hidden group-hover:inline">Descargar</span>
        </a>
        {(userRole === "admin" || userRole === "editor") && (
          <div className="flex space-x-2">
            <a
              href={`/editTool/${id}`}
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

Tool.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

export default Tool;
