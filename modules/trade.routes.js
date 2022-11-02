const validation = require("../middlewares/validation");
const router = require("express").Router();
const tradeController = require("./trade.controller");

router.get("/", tradeController.getTradeByQuery);

router.post("/", validation.postValidation, tradeController.saveTrade);

router.get("/:id", tradeController.getTradeById);

router.patch("/:id", validation.patchValidation, tradeController.updateTrade);

router.put("/:id",validation.patchValidation, tradeController.updatePartialTrade)

router.delete("/:id", tradeController.deleteTrade);

module.exports = router;
