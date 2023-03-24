const express = require("express");
const listController = require("../controllers/list.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from list controller");
});
router.get("/list-all", listController.all);

module.exports = router;
