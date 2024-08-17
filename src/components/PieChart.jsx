import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

const PieChart = ({ data, options }) => (
  <Chart
    chartType="PieChart"
    width="100%"
    height="400px"
    data={data}
    options={options}
  />
);

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  options: PropTypes.object.isRequired,
};

export default PieChart;
