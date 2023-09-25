const { Pool } = require("pg");
require("dotenv").config();

const username = "postgres";
const host = "127.0.0.1";
const database = "postgresgames";
const password = "Amit200800";
const port = 5000;

const pool = new Pool({
  user: username,
  host: host,
  database: database,
  password: password,
  port: port,
});

module.exports = {
  pool: pool,
};
