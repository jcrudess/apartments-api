const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRouter = require("./api/routes/");
const dbConfig = require("./api/config/db.config");
const globalConfig = require("./api/config/global.config");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", apiRouter);

// /* Error handler middleware */
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   console.error(err.message, err.stack);
//   res.status(statusCode).json({'message': err.message});

//   return;
// });

app.listen(globalConfig.port, "0.0.0.0", () => {
  console.log(`Listening at http://localhost:${globalConfig.port}`);
});
