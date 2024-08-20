import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../redux/userSlice.js";
import { multimediaList } from "../redux/multimediaSlice.js";
import { appList } from "../redux/appSlice.js";
import { documentList } from "../redux/documentSlice";
import { suggestionList } from "../redux/suggestionSlice.js";
import Messages from "./Messages.jsx";
import { DateTime } from "luxon";
import {
  Input,
  Checkbox,
  Card,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";

function Chart() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("noFilter");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const [showUsers, setShowUsers] = useState(true);
  const [showDocuments, setShowDocuments] = useState(true);
  const [showVideos, setShowVideos] = useState(true);
  const [showTools, setShowTools] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

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

  const filterData = (data, filter, dateField = "date") => {
    const now = DateTime.now();
    let startDate;
    let endDate = now;

    switch (filter) {
      case "lastMonth":
        startDate = now.minus({ months: 1 });
        break;
      case "lastYear":
        startDate = now.minus({ years: 1 });
        break;
      case "lastWeek":
        startDate = now.minus({ weeks: 1 });
        break;
      case "Today":
        startDate = now.startOf("day");
        break;
      case "customRange":
        startDate = DateTime.fromISO(customRange.start);
        endDate = DateTime.fromISO(customRange.end);
        break;
      case "noFilter":
        return data;
      default:
        startDate = DateTime.fromISO("1995-10-01");
    }

    return data.filter((item) => {
      const itemDate = DateTime.fromISO(item[dateField]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const filteredUsers = filterData(users, filter, "start_date");
  const filteredDocuments = filterData(documents, filter);
  const filteredVideos = filterData(videos, filter);
  const filteredTools = filterData(tools, filter);
  const filteredSuggestions = filterData(suggestions, filter);

  const data = [
    {
      id: "Usuarios",
      label: "Usuarios",
      value: filteredUsers?.length || 0,
      show: showUsers,
    },
    {
      id: "Documentos",
      label: "Documentos",
      value: filteredDocuments?.length || 0,
      show: showDocuments,
    },
    {
      id: "Videos",
      label: "Videos",
      value: filteredVideos?.length || 0,
      show: showVideos,
    },
    {
      id: "Herramientas",
      label: "Herramientas",
      value: filteredTools?.length || 0,
      show: showTools,
    },
    {
      id: "Quejas y Sugerencias",
      label: "Quejas y Sugerencias",
      value: filteredSuggestions?.length || 0,
      show: showSuggestions,
    },
  ].filter((item) => item.show);

  const options = {
    innerRadius: 0.4,
    padAngle: 0.7,
    cornerRadius: 3,
    colorScheme: "nivo",
    borderWidth: 1,
    radialLabelsSkipAngle: 10,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: "#333333",
    radialLabelsLinkColor: { from: "color" },
    sliceLabelsSkipAngle: 10,
    sliceLabelsTextColor: "#333333",
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleCustomRangeChange = (e) => {
    setCustomRange({
      ...customRange,
      [e.target.name]: e.target.value,
    });
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
        <div className="flex flex-col lg:flex-row justify-center h-screen bg-gray-100">
          <div className="w-full lg:w-4/5 h-4/5 p-4 bg-white rounded-lg shadow-lg my-10 mx-2">
            <PieChart data={data} options={options} />
          </div>
          <Card className="w-full lg:w-1/4 h-4/5 p-4 m-2 bg-white rounded-lg shadow-lg flex items-center justify-center my-10">
            <CardBody>
              <Select
                label="Filtro"
                value={filter}
                onChange={(e) => handleFilterChange(e)}
                className="p-2 my-2 border rounded mb-4"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <Option value="noFilter">Sin filtro</Option>
                <Option value="lastYear">Último año</Option>
                <Option value="lastMonth">Último mes</Option>
                <Option value="lastWeek">Última semana</Option>
                <Option value="Today">Hoy</Option>
                <Option value="customRange">Rango personalizado</Option>
              </Select>

              {filter === "customRange" && (
                <div className="flex flex-col my-3 space-y-2 text-xs">
                  <div className="flex flex-col">
                    <Input
                      type="date"
                      name="start"
                      label="Fecha Inicial"
                      value={customRange.start}
                      onChange={handleCustomRangeChange}
                      className="p-1 my-1 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Input
                      type="date"
                      name="end"
                      label="Fecha Final"
                      value={customRange.end}
                      onChange={handleCustomRangeChange}
                      className="p-1 my-1 border rounded"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start mt-4 space-y-2">
                <Checkbox
                  label="Usuarios"
                  checked={showUsers}
                  onChange={() => setShowUsers(!showUsers)}
                  className="mr-1"
                />

                <Checkbox
                  label="Documentos"
                  checked={showDocuments}
                  onChange={() => setShowDocuments(!showDocuments)}
                  className="mr-1"
                />

                <Checkbox
                  label="Videos"
                  checked={showVideos}
                  onChange={() => setShowVideos(!showVideos)}
                  className="mr-1"
                />

                <Checkbox
                  label="Herramientas"
                  checked={showTools}
                  onChange={() => setShowTools(!showTools)}
                  className="mr-1"
                />

                <Checkbox
                  label="Quejas y Sugerencias"
                  checked={showSuggestions}
                  onChange={() => setShowSuggestions(!showSuggestions)}
                  className="mr-1"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export default Chart;
