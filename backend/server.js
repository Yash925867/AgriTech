const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "india_agriculture_db",
  password: "mysql", // <-- change this
  port: 5432,
});

/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ===============================
   GET STATES
================================ */
app.get("/states", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT s.state_name
      FROM state s
      ORDER BY s.state_name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("States Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ===============================
   GET CROPS
================================ */
app.get("/crops", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT crop_name
      FROM crop
      ORDER BY crop_name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Crops Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ===============================
   GET YEARS
================================ */
app.get("/years", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT year
      FROM production
      ORDER BY year
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Years Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ===============================
   YEAR TREND
================================ */
app.get("/year-trend", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.year,
             SUM(p.production_tonnes) AS total_production
      FROM production p
      GROUP BY p.year
      ORDER BY p.year
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Year Trend Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ===============================
   TOP STATES
================================ */
app.get("/top-states", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.state_name,
             SUM(p.production_tonnes) AS total_production
      FROM production p
      JOIN district d ON p.district_id = d.district_id
      JOIN state s ON d.state_id = s.state_id
      GROUP BY s.state_name
      ORDER BY total_production DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Top States Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});
app.get("/state-comparison", async (req, res) => {
  const { states, crop, year } = req.query;

  try {
    const stateArray = states.split(",");

    const result = await pool.query(
      `
      SELECT s.state_name,
             SUM(p.production_tonnes) AS total_production,
             SUM(p.area_hectare) AS total_area,
             AVG(p.yield) AS avg_yield
      FROM production p
      JOIN district d ON p.district_id = d.district_id
      JOIN state s ON d.state_id = s.state_id
      JOIN crop c ON p.crop_id = c.crop_id
      WHERE s.state_name = ANY($1)
        AND c.crop_name = $2
        AND p.year = $3
      GROUP BY s.state_name
      ORDER BY total_production DESC
      `,
      [stateArray, crop, year]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Comparison Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});
/* ===============================
   FILTER DATA
================================ */
app.get("/filter-data", async (req, res) => {
  const { state, crop, year } = req.query;

  try {
    let conditions = [];
    let values = [];
    let index = 1;

    if (state) {
      conditions.push(`s.state_name = $${index++}`);
      values.push(state);
    }

    if (crop) {
      conditions.push(`c.crop_name = $${index++}`);
      values.push(crop);
    }

    if (year) {
      conditions.push(`p.year = $${index++}`);
      values.push(year);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    /* ---- Chart Data ---- */
    const chartQuery = `
      SELECT s.state_name,
             SUM(p.production_tonnes) AS total_production
      FROM production p
      JOIN district d ON p.district_id = d.district_id
      JOIN state s ON d.state_id = s.state_id
      JOIN crop c ON p.crop_id = c.crop_id
      ${whereClause}
      GROUP BY s.state_name
      ORDER BY total_production DESC
      LIMIT 10
    `;

    const chartResult = await pool.query(chartQuery, values);

    /* ---- KPI Data ---- */
    const kpiQuery = `
      SELECT 
        SUM(p.production_tonnes) AS total_production,
        SUM(p.area_hectare) AS total_area,
        AVG(p.yield) AS avg_yield
      FROM production p
      JOIN district d ON p.district_id = d.district_id
      JOIN state s ON d.state_id = s.state_id
      JOIN crop c ON p.crop_id = c.crop_id
      ${whereClause}
    `;

    const kpiResult = await pool.query(kpiQuery, values);

    res.json({
      chartData: chartResult.rows,
      kpiData: kpiResult.rows[0],
    });

  } catch (err) {
    console.error("Filter Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ===============================
   START SERVER
================================ */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});