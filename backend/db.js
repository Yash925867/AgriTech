const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "india_agriculture_db",
  password: "mysql",
  port: 5432,
});

module.exports = pool;