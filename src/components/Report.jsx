import PropTypes from "prop-types";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Report = ({ name, columns, data, date }) => {
  const generateReport = () => {
    const report = new jsPDF({ orientation: "landscape", format: "letter" });
    report.text(name, 95, 20);
    report.text(`Fecha: ${date}`, 10, 30);

    //todo: Generar la tabla
    report.autoTable({
      // styles: { fillColor: [255, 0, 0] },
      startY: 50,
      head: columns,
      margin: { top: 10 },
      body: data,
      theme: "striped",
      fontStyle: "normal",
      font: "times",
    });

    report.save(`${name} ${date}.pdf`);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between">
      <div className="p-4 flex-grow">
        <h2 className="mt-1 text-md font-semibold text-gray-900">{name}</h2>
      </div>
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => generateReport()}
          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-2 py-1 rounded flex items-center"
        >
          <FaDownload className="mr-1" />
          <span className="hidden group-hover:inline">Descargar</span>
        </button>
      </div>
    </div>
  );
};

Report.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default Report;
