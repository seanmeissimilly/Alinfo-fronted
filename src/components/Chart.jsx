import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../redux/userSlice.js";
import { multimediaList } from "../redux/multimediaSlice.js";
import { appList } from "../redux/appSlice.js";
import { documentList } from "../redux/documentSlice";
import { suggestionList } from "../redux/suggestionSlice.js";
import Messages from "./Messages.jsx";

function Chart() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("lastMonth");

  const {
    users,
    userInfo,
    error: errorUser,
  } = useSelector((state) => state.user);

  const { documents, error: errorDocument } = useSelector(
    (state) => state.document
  );

  const { multimedias: videos, error: errorVideo } = useSelector(
    (state) => state.multimedia
  );

  const { apps: tools, error: errorTool } = useSelector((state) => state.app);

  const { suggestions, error: errorSuggestion } = useSelector(
    (state) => state.suggestion
  );

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(userList({ token: userInfo.token }));
      dispatch(documentList({ token: userInfo.token }));
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(appList({ token: userInfo.token }));
      dispatch(suggestionList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo]);

  const data = [
    ["Apartado", "Cantidad"],
    ["Usuarios", users?.length],
    ["Documentos", documents?.length],
    ["Videos", videos?.length],
    ["Herramientas", tools?.length],
    ["Quejas y Sugerencias", suggestions?.length],
  ];

  const options = {
    title: "Cantidades",
    pieHole: 0.4,
    is3D: false,
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Aquí puedes agregar la lógica para filtrar los datos según la fecha seleccionada
  };

  return (
    <>
      {errorUser ||
      errorVideo ||
      errorTool ||
      errorDocument ||
      errorSuggestion ? (
        <Messages>{errorUser}</Messages>
      ) : (
        <div className="flex flex-row  justify-center h-screen bg-gray-100">
          <div className="w-4/5 h-3/4 p-4 m-2 bg-white rounded-lg shadow-lg my-10 ml-2">
            <PieChart data={data} options={options} />
          </div>
          <div className="w-1/5 h-1/3 md:w-1/2 md:h-1/4 p-4 m-2 bg-white rounded-lg shadow-lg flex items-center justify-center my-10">
            <div className="flex flex-col items-center">
              <label className="mb-2">Filtro</label>
              <select
                value={filter}
                onChange={handleFilterChange}
                className="p-2 border rounded"
              >
                <option value="lastMonth">Último mes</option>
                <option value="lastYear">Último año</option>
                <option value="lastWeek">Última semana</option>
                <option value="Today">Hoy</option>
                <option value="customRange">Rango personalizado</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chart;
