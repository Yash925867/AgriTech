import { useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import ChartCard from "../components/ChartCard";
import FilterPanel from "../components/FilterPanel";
import KpiCard from "../components/KpiCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CropAnalysis() {
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState(null);

  const handleApply = (filters) => {
    axios.get("http://localhost:5000/filter-data", {
      params: filters,
    }).then(res => {
      setData(res.data.chartData);
      setKpi(res.data.kpiData);
    });
  };

  const chartData = {
    labels: data.map(d => d.state_name),
    datasets: [
      {
        label: "Production (MT)",
        data: data.map(d => d.total_production),
        backgroundColor: "#2e7d32",
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterPanel onApply={handleApply} />
      </Grid>

      {kpi && (
        <>
          <Grid item xs={12} md={4}>
            <KpiCard
              title="Total Production"
              value={kpi.total_production}
              subtitle="MT"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <KpiCard
              title="Total Area"
              value={kpi.total_area}
              subtitle="Hectares"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <KpiCard
              title="Avg Yield"
              value={kpi.avg_yield}
              subtitle="Tonnes/Hectare"
            />
          </Grid>
        </>
      )}

      {data.length > 0 && (
        <Grid item xs={12}>
          <ChartCard title="Production by State">
            <Bar data={chartData} />
          </ChartCard>
        </Grid>
      )}
    </Grid>
  );
}

export default CropAnalysis;