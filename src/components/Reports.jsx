import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import Report from "./Report.jsx";
import { userList } from "../redux/userSlice.js";
import {
  multimediaList,
  multimediaclassificationList,
} from "../redux/multimediaSlice.js";
import { appList, appClassificationList } from "../redux/appSlice.js";
import {
  documentList,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";
import moment from "moment/moment.js";

function Reports() {
  const dispatch = useDispatch();
  const {
    users,
    userInfo,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);

  const {
    documents,
    documenttypes,
    documentclassification,
    error: errorDocument,
    loading: loadingDocument,
  } = useSelector((state) => state.document);

  const {
    multimedias: videos,
    multimediaclassification,

    error: errorVideo,
    loading: loadingVideo,
  } = useSelector((state) => state.multimedia);

  const {
    apps: tools,
    appclassification,
    error: errorTool,
    loading: loadingTool,
  } = useSelector((state) => state.app);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(userList({ token: userInfo.token }));
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(multimediaclassificationList({ token: userInfo.token }));
      dispatch(documentList({ token: userInfo.token }));
      dispatch(documenttypesList({ token: userInfo.token }));
      dispatch(documentclassificationList({ token: userInfo.token }));
      dispatch(appList({ token: userInfo.token }));
      dispatch(appClassificationList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo]);

  const formatDate = (date) => moment(date).format("DD-MM-YYYY");

  const documentsWithAll = [...documents].map((document) => ({
    ...document,
    type: documenttypes.find((type) => type.id === document.documenttypes)
      ?.description,
    classification: documentclassification.find(
      (classification) => classification.id === document.documentclassification
    )?.description,
  }));

  const videosWithAll = [...videos].map((video) => ({
    ...video,

    classification: multimediaclassification.find(
      (classification) => classification.id === video.multimediaclassification
    )?.description,
  }));

  const toolsWithAll = [...tools].map((tool) => ({
    ...tool,
    classification: appclassification.find(
      (classification) => classification.id === tool.applicationclassification
    )?.description,
  }));

  const reports = [
    {
      id: 1,
      name: "Listado de Usuarios",
      columns: [
        [
          "ID",
          "Nombre de Usuario",
          "Correo",
          "Rol",
          "Fecha de Inicio",
          "Última Entrada",
        ],
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
          formatDate(user.start_date),
          formatDate(user.last_login),
        ]),
    },
    {
      id: 2,
      name: "Listado de Documentos",
      columns: [["ID", "Título", "Fecha", "Tipo", "Clasificación", "Usuario"]],
      data: documentsWithAll
        .sort((a, b) => a.id - b.id)
        .map((document) => [
          document.id,
          document.title,
          formatDate(document.date),
          document.type,
          document.classification,
          document.user,
        ]),
    },
    {
      id: 3,
      name: "Listado de Videos",
      columns: [["ID", "Título", "Fecha", "Clasificación", "Usuario"]],
      data: videosWithAll
        .sort((a, b) => a.id - b.id)
        .map((video) => [
          video.id,
          video.title,
          formatDate(video.date),
          video.classification,
          video.user,
        ]),
    },
    {
      id: 4,
      name: "Listado de Herramientas",
      columns: [["ID", "Título", "Fecha", "Clasificación", "Usuario"]],
      data: toolsWithAll
        .sort((a, b) => a.id - b.id)
        .map((tool) => [
          tool.id,
          tool.title,
          formatDate(tool.date),
          tool.classification,
          tool.user,
        ]),
    },
    {
      id: 5,
      name: "Listado de Tipos de Documentos",
      columns: [["ID", "Description"]],
      data: [...documenttypes]
        .sort((a, b) => a.id - b.id)
        .map((document) => [document.id, document.description]),
    },
    {
      id: 6,
      name: "Listado de Clasificaciones de Documentos",
      columns: [["ID", "Description"]],
      data: [...documentclassification]
        .sort((a, b) => a.id - b.id)
        .map((document) => [document.id, document.description]),
    },
    {
      id: 7,
      name: "Listado de Clasificaciones de Videos",
      columns: [["ID", "Description"]],
      data: [...multimediaclassification]
        .sort((a, b) => a.id - b.id)
        .map((video) => [video.id, video.description]),
    },
    {
      id: 8,
      name: "Listado de Clasificaciones de Herramientas",
      columns: [["ID", "Description"]],
      data: [...appclassification]
        .sort((a, b) => a.id - b.id)
        .map((tool) => [tool.id, tool.description]),
    },
  ];

  const renderReports = () => {
    return reports.map((report) => (
      <Report
        key={report.id}
        name={report.name}
        columns={report.columns}
        data={report.data}
        date={formatDate(new Date())}
      />
    ));
  };

  return (
    <>
      {loadingUser || loadingVideo || loadingTool || loadingDocument ? (
        <Loader />
      ) : errorUser || errorVideo || errorTool || errorDocument ? (
        <Messages>{errorUser}</Messages>
      ) : (
        <div className="container mx-auto p-4 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderReports()}
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
