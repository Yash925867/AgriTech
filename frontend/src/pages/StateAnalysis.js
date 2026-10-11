import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  Checkbox,
  ListItemText
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ["#2e7d32", "#1976d2", "#ff9800", "#9c27b0", "#f44336"];

function StateAnalysis() {
  const [states, setStates] = useState([]);
  const [crops, setCrops] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/states").then(res => setStates(res.data));
    axios.get("http://localhost:5000/crops").then(res => setCrops(res.data));
    axios.get("http://localhost:5000/years").then(res => setYears(res.data));
  }, []);

  const applyFilter = async () => {
    const res = await axios.get("http://localhost:5000/state-comparison", {
      params: {
        states: selectedStates.join(","),
        crop: selectedCrop,
        year: selectedYear
      }
    });
    setData(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        State Comparison Analysis
      </Typography>

      <Grid container spacing={2}>

        <Grid item xs={4}>
          <Select
            multiple
            fullWidth
            value={selectedStates}
            onChange={(e) => setSelectedStates(e.target.value)}
            renderValue={(selected) => selected.join(", ")}
          >
            {states.map((s, i) => (
              <MenuItem key={i} value={s.state_name}>
                <Checkbox checked={selectedStates.indexOf(s.state_name) > -1} />
                <ListItemText primary={s.state_name} />
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={3}>
          <Select
            fullWidth
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            {crops.map((c, i) => (
              <MenuItem key={i} value={c.crop_name}>
                {c.crop_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={3}>
          <Select
            fullWidth
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((y, i) => (
              <MenuItem key={i} value={y.year}>
                {y.year}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Button variant="contained" fullWidth onClick={applyFilter}>
            Compare
          </Button>
        </Grid>

      </Grid>

      <Grid container spacing={3} style={{ marginTop: 30 }}>

        {/* BAR CHART */}
        {/* BAR */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Production Comparison</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state_name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total_production" fill="#2e7d32" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* PIE CHART */}
        {/* BAR */}
          <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Production Share</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="total_production"
                    nameKey="state_name"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Comparison Table</Typography>
              <table width="100%">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Production</th>
                    <th>Area</th>
                    <th>Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.state_name}</td>
                      <td>{parseFloat(row.total_production).toFixed(2)}</td>
                      <td>{parseFloat(row.total_area).toFixed(2)}</td>
                      <td>{parseFloat(row.avg_yield).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}

export default StateAnalysis;