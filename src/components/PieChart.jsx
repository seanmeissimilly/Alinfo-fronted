import { useEffect } from "react";
import PropTypes from "prop-types";

const PieChart = ({ data, options }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/loader.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.charts.load("current", {
        packages: ["corechart"],
      });
      window.google.charts.setOnLoadCallback(() => {
        const dataTable = window.google.visualization.arrayToDataTable(data);
        const chart = new window.google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(dataTable, options);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [data, options]);

  return <div id="piechart" style={{ width: "100%", height: "400px" }} />;
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  options: PropTypes.object.isRequired,
};

export default PieChart;
