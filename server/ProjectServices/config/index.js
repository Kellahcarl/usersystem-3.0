require("dotenv").config();
const mssql = require("mssql");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

mssql
  .connect(config)
  .then((pool) => {
    if (pool.connecting) {
      console.log("connecting to db");
    }
    if (pool.connected) {
      console.log("connected");
    }
  })
  .catch((e) => {
    console.log(e.message);
  });

module.exports = config;
