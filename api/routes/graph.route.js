const express = require("express");
const graphController = require("../controllers/graph.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from graph controller");
});
router.get("/price-ranges", graphController.priceRanges);
router.get("/hotness-bar", graphController.hotBar);

module.exports = router;
