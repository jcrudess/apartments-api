const express = require("express");

const graphRoutes = require("./graph.route");
const listRoutes = require("./list.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => {
  res.json({
    message: "OK",
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  });
});

router.use("/graph", graphRoutes);
router.use("/list", listRoutes);

module.exports = router;
