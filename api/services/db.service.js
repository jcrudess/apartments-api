const mysql = require("mysql2/promise");
const config = require("../config/db.config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.getDBInfo());
  const [results] = await connection.execute(sql, params);

  connection.end();

  return results;
}

async function runStoredProcedure(procName) {
  const connection = await mysql.createConnection(config.getDBInfo());
  const results = connection
    .execute(procName)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
  await connection.end();
  return results;
}

module.exports = {
  query,
  runStoredProcedure,
};
