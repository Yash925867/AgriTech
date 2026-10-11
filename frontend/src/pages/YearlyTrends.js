import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function YearlyTrends() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/year-trend")
      .then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: "Total Production",
        data: data.map(d => d.total_production),
        borderColor: "#2e7d32",
        backgroundColor: "#a5d6a7",
      },
    ],
  };

  return <Line data={chartData} />;
}

export default YearlyTrends;