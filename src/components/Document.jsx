import React from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const Document = ({
  id,
  title,
  description,
  type,
  classification,
  user,
  userImage,
  data,
  userRole,
  onDelete,
  date,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-6">
        <h2 className="mt-2 text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-3 text-gray-600 whitespace-pre-line">{description}</p>
        <div className="mt-4">
          <div className="mt-1">
            <span className="text-gray-700">Clasificación: </span>
            <span className="text-gray-900 font-bold">{classification}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Tipo: </span>
            <span className="text-gray-900 font-bold">{type}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Fecha de publicación: </span>
            <span className="text-gray-900 font-bold">{date}</span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-gray-700">Subido por: </span>
            <img
              src={userImage}
              className="rounded-full mx-2"
              width="40"
              alt="User"
            />
            <span className="font-bold">{user}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <a
              href={data}
              className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded flex items-center"
              download
            >
              <FaDownload className="mr-2" />
              <span className="hidden group-hover:inline">Descargar</span>
            </a>
            {(userRole === "admin" || userRole === "editor") && (
              <div className="flex space-x-4">
                <a
                  href={`/edit/${id}`}
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
      </div>
    </div>
  );
};

Document.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

export default Document;
