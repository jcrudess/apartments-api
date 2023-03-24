const dbService = require("../services/db.service");

module.exports.priceRanges = async (req, res) => {
  let dbResponse = await dbService.runStoredProcedure(
    "CALL GRAPH_PRICE_RANGE()"
  );
  let result = Object.entries(dbResponse[0][0][0])
    .map(([key, value]) => ({ Name: key, count: value }))
    .filter((item) => item.count > 0);
  res.json(result);
};

module.exports.hotBar = (req, res) => {
  res.send("res from hotness bar");
};
