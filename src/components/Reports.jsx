import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import Report from "./Report.jsx";
import { userList } from "../redux/userSlice.js";
import moment from "moment";
import {
  multimediaList,
  multimediaclassificationList,
} from "../redux/multimediaSlice.js";

function Reports() {
  const dispatch = useDispatch();
  const {
    users,
    userInfo,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);

  const {
    multimedias: videos,
    multimediaclassification,

    error: errorVideo,
    loading: loadingVideo,
  } = useSelector((state) => state.multimedia);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(userList({ token: userInfo.token }));
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(multimediaclassificationList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo]);

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  // const usuarios = [
  //   { id: 1, rol: 2 },
  //   { id: 2, rol: 1 },
  //   // ... otros usuarios
  // ];

  // const roles = [
  //   { id_rol: 1, description: "Administrador" },
  //   { id_rol: 2, description: "Vendedor" },
  //   // ... otros roles
  // ];

  // const usuariosConDescripciones = usuarios.map((usuario) => ({
  //   ...usuario,
  //   descripcion_rol: roles.find((r) => r.id_rol === usuario.rol).description,
  // }));

  const reports = [
    {
      id: 1,
      name: "Listado de Usuarios",
      columns: [
        ["id", "Nombre de Usuario", "Correo", "Rol", "Fecha de Inicio"],
      ],
      data: [...users]
        .sort((a, b) => a.id - b.id)
        .map((user) => [
          user.id,
          user.user_name,
          user.email,
          user.role === "reader"
            ? "Lector"
            : user.role === "editor"
            ? "Editor"
            : "Administrador",
          user.start_date.substring(0, 10),
        ]),
    },
    {
      id: 2,
      name: "Listado de Documentos",
      columns: [
        ["id", "Nombre de Usuario", "Correo", "Rol", "Fecha de Inicio"],
      ],
      data: [...users]
        .sort((a, b) => a.id - b.id)
        .map((user) => [
          user.id,
          user.user_name,
          user.email,
          user.role === "reader"
            ? "Lector"
            : user.role === "editor"
            ? "Editor"
            : "Administrador",
          user.start_date.substring(0, 10),
        ]),
    },
    {
      id: 3,
      name: "Listado de Videos",
      columns: [["id", "Título", "Fecha", "Clasificación", "Usuario"]],
      data: [...videos]
        .sort((a, b) => a.id - b.id)
        .map((video) => [
          video.id,
          video.title,
          video.date.substring(0, 10),
          video.multimediaclassification,
          video.user,
        ]),
    },
    {
      id: 4,
      name: "Listado de Herramientas",
      columns: [
        ["id", "Nombre de Usuario", "Correo", "Rol", "Fecha de Inicio"],
      ],
      data: [...users]
        .sort((a, b) => a.id - b.id)
        .map((user) => [
          user.id,
          user.user_name,
          user.email,
          user.role === "reader"
            ? "Lector"
            : user.role === "editor"
            ? "Editor"
            : "Administrador",
          user.start_date.substring(0, 10),
        ]),
    },
  ];

  const renderReports = () => {
    return reports.map((report) => (
      <Report
        key={report.id}
        name={report.name}
        columns={report.columns}
        data={report.data}
        date={formatDate(moment())}
      />
    ));
  };

  return (
    <>
      {loadingUser || loadingVideo ? (
        <Loader />
      ) : errorUser || errorVideo ? (
        <Messages>{errorUser}</Messages>
      ) : (
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderReports()}
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
