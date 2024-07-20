import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaDownload } from "react-icons/fa";

const Report = ({ name, columns, data, date }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between">
      <div className="p-4 flex-grow">
        <h2 className="mt-1 text-md font-semibold text-gray-900">{name}</h2>
      </div>
      <div className="flex items-center justify-between p-4">
        <a
          href=""
          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-2 py-1 rounded flex items-center"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDownload className="mr-1" />
          <span className="hidden group-hover:inline">Descargar</span>
        </a>
      </div>
    </div>
  );
};

Report.propTypes = {
  name: PropTypes.number.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default Report;
