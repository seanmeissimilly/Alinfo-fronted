import React from "react";
import PropTypes from "prop-types";

const Video = ({
  title,
  description,
  classification,
  user,
  videoLink,
  date,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 max-w-sm mx-auto">
      <div className="relative">
        <video className="w-full h-48 object-cover" controls>
          <source src={videoLink} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
          <span className="text-xs">{classification}</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Subido por: <span className="text-gray-900 font-bold">{user}</span>
          </span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

Video.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Video;
