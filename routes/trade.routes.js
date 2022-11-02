const validation = require("../middleware/validation");
const router = require("express").Router();
const tradeController = require("../controller/trade.controller");

router.post("/", validation.postValidation, tradeController.saveTrade);

router.get("/:id", tradeController.getTradeById);

router.get("/", tradeController.getTradeByQuery);

router.patch("/:id", validation.patchValidation, tradeController.updateTrade);

router.delete("/:id", tradeController.deleteTrade);

module.exports = router;
