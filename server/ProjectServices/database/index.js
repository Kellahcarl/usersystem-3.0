const sql = require("mssql");
const config = require("../config");

const connection = async () => {
  let pool = null;

  try {
    pool = await sql.connect(config);
  } catch (error) {
    pool = null;
    console.log(error);
  }

  return pool;
};

const createRequest = async (request, params = {}) => {
  const keys = Object.keys(params);

  keys.map((keyName) => {
    const keyValue = params[keyName];
    request.input(keyName, keyValue);
  });
  return request;
};

const execution = async (procedureName, params = {}) => {
  const requestProc = await connection();
  let request = await requestProc.request();
  request = await createRequest(request, params);

  const results = await request.execute(procedureName);
  return results;
};

const querying = async (query) => {
  const requestQuery = await connection();
  const results = await requestQuery.request().query(query);
  return results;
};

module.exports = {
  exec: execution,
  query: querying,
};
