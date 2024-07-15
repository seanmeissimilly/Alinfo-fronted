import React from "react";
import PropTypes from "prop-types";

const Document = ({
  name,
  description,
  type,
  classification,
  user,
  downloadLink,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-indigo-500">{type}</div>
          <a
            href={downloadLink}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Descargar
          </a>
        </div>
        <h2 className="mt-2 text-lg font-semibold text-gray-900">{name}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4">
          <span className="text-gray-700">Clasificación: </span>
          <span className="text-gray-900 font-bold">{classification}</span>
        </div>
        <div className="mt-2">
          <span className="text-gray-700">Subido por: </span>
          <span className="text-gray-900 font-bold">{user}</span>
        </div>
      </div>
    </div>
  );
};

Document.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  downloadLink: PropTypes.string.isRequired,
};

export default Document;
