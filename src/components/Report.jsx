import PropTypes from "prop-types";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import logo_cujae from "../media/logo_cujae - reporte.png";
import autoTable from "jspdf-autotable";

const Report = ({ name, columns, data, date }) => {
  const generateReport = () => {
    const report = new jsPDF({ orientation: "landscape", format: "letter" });
    report.setFontSize(14);
    report.setFont("Calibri", "bold");
    report.text("Alinfo", 12, 40);
    report.setLanguage("es-ES");
    report.addImage(logo_cujae, 5, 5);
    report.text(name, 120, 40);
    report.text(`Fecha: ${date}`, 225, 30);

    //todo: Generar la tabla
    report.autoTable({
      startY: 60,
      head: columns,
      margin: { top: 10 },
      body: data,
      theme: "striped",
      fontStyle: "normal",
      font: "times",
      pageBreak: "auto",
      tableWidth: "auto",
      rowPageBreak: "auto",
      styles: { fontSize: 12, cellWidth: "auto", lineColor: 10 },
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
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
};

export default Report;
