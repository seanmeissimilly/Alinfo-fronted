import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const Video = ({
  id,
  title,
  description,
  classification,
  user,
  userInfo,
  userImage,
  data,
  userRole,
  onDelete,
  date,
  email,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const videoRef = useRef(null);
  const sourceRef = useRef(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleDelete = () => {
    if (videoRef.current && sourceRef.current) {
      videoRef.current.pause();
      //! Modifico la fuente para asegurarme de que el video no esté abierto al momento de eliminarlo.
      sourceRef.current.src = null;

      onDelete();
    }
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between transition-transform transform hover:scale-105">
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
            <video ref={videoRef} className="h-full w-full rounded-lg" controls>
              <source ref={sourceRef} src={data} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
          </div>
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
        <Button
          color="indigo"
          variant="text"
          className="relative group"
          onClick={() => window.open(data, "_blank")}
        >
          <FaDownload size={15} />
          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
            Descargar
          </span>
        </Button>

        {(userRole === "admin" ||
          (userRole === "editor" && email === userInfo.email)) && (
          <div className="flex space-x-2">
            <Button
              color="blue"
              variant="text"
              className="relative group"
              onClick={() => (window.location.href = `/videos/editVideo/${id}`)}
            >
              <FaEdit size={15} />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                Editar
              </span>
            </Button>
            <Button
              color="red"
              variant="text"
              className="relative group"
              onClick={handleDelete}
            >
              <FaTrash size={15} />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                Borrar
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

Video.propTypes = {
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
  userInfo: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export default Video;
