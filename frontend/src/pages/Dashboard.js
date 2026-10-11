import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
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
  LineChart,
  Line,
  Legend
} from "recharts";

const COLORS = ["#2e7d32", "#1976d2", "#ff9800", "#9c27b0", "#f44336"];

function Dashboard() {
  const [topStates, setTopStates] = useState([]);
  const [yearTrend, setYearTrend] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/top-states")
      .then(res => setTopStates(res.data));

    axios.get("http://localhost:5000/year-trend")
      .then(res => setYearTrend(res.data));
  }, []);

  return (
    <AnimatedPage>
      <div style={{ padding: 20 }}>

        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>

        {/* KPI CARDS */}
        <Grid container spacing={3}>

          {[
            { title: "Top States", value: topStates.length },
            { title: "Years Covered", value: yearTrend.length },
            { title: "Total Records", value: "Dynamic" },
            { title: "Growth Trend", value: "Rising" },
          ].map((item, index) => (
            <Grid item xs={3} key={index}>
              <motion.div whileHover={{ scale: 1.08 }}>
                <Card
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="h4">
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* CHARTS */}
        <Grid container spacing={4} style={{ marginTop: 20 }}>

          {/* BAR CHART */}
         {/* BAR */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Top Producing States
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topStates}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="state_name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="total_production"
                        fill="#2e7d32"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* PIE CHART */}
          {/* BAR */}
         <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Production Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={topStates}
                        dataKey="total_production"
                        nameKey="state_name"
                        outerRadius={100}
                        label
                      >
                        {topStates.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* LINE TREND */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.01 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Yearly Production Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={yearTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="total_production"
                        stroke="#1976d2"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

        </Grid>

      </div>
    </AnimatedPage>
  );
}

export default Dashboard;