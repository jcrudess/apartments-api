const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 999;

if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  throw new Error("Missing database connection details in .env file");
}

//test get

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//GET graf koji prikazuje breakdown stanova po rasponima cijena

app.get("/api/graph/price-ranges", (req, res) => {
  console.log("get api graph price-ranges");
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) throw err;
  });

  const query = `CALL GRAPH_PRICE_RANGE()`;

  connection.query(query, (err, data) => {
    if (err) {
      throw err;
    } else {
      let result = Object.entries(data[0][0])
        .map(([key, value]) => ({ Name: key, count: value }))
        .filter((item) => item.count > 0);
      res.json(result);
    }
    connection.end();
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
