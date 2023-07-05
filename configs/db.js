const { Client } = require("pg");
const client = new Client({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  password: process.env.PSQL_PASS,
  database: process.env.PSQL_DB,
});
module.exports = client;
