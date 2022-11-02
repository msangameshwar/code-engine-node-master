const db = require("../models");
const Trade = db.trades;

// Save Trade
exports.saveTrade = async (req, res) => {
  try {
    const save = await Trade.create(req.body);
    return res.status(201).json({ message: "New Trade added", data: save });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Get trade by ID
exports.getTradeById = async (req, res) => {
  try {
    const trade = await Trade.findByPk(req.params.id);
    if (trade) {
      return res.status(200).json({ message: "Success", data: trade });
    }
    return res.status(400).send({ message: "Id is not available" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Get trades by query parameter i.e. type or user_id
exports.getTradeByQuery = async (req, res) => {
  try {
    const type = req.query.type;
    const user_id = req.query.user_id;
    if (!type && !user_id) {
      const trades = await Trade.findAll();
      return res.status(200).json({ message: "Success", data: trades });
    }

    if (!type && user_id) {
      const trade = await Trade.findAll({
        where: { user_id: req.query.user_id },
      });

      if (trade) {
        return res.status(200).json({ message: "Success", data: trade });
      }

      return res.status(400).send({ message: "No data found !!!" });
    }

    if (type && !user_id) {
      if (type != "buy" && type != "sale") {
        return res.status(400).send({ message: "Enter valid type value" });
      }

      const trade = await Trade.findAll({
        where: { type: req.query.type },
      });

      if (trade) {
        return res.status(200).json({ message: "Success", data: trade });
      }
      return res.status(400).send({ message: "No data found !!!" });
    }

    if (type && user_id) {
      if (type != "buy" && type != "sale") {
        return res.status(400).send({ message: "Enter valid type value" });
      }
      const trade = await Trade.findAll({
        where: { type: req.query.type, user_id: user_id },
      });

      if (trade) {
        return res.status(200).json({ message: "Success", data: trade });
      }
      return res.status(400).send({ message: "No data found !!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update trade
exports.updateTrade = async (req, res) => {
  try {
    const id = req.params.id;
    const [updatedTrade] = await Trade.update(req.body, {
      where: { id: id },
    });
    if (updatedTrade) {
      const trade = await Trade.findByPk(req.params.id);
      return res
        .status(201)
        .json({ message: "Trade Successfully updated", data: trade });
    }
    return res.status(400).send({ message: "Id is not available" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Delete trade
exports.deleteTrade = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTrade = await Trade.destroy({ where: { id: id } });
    if (deleteTrade == 1) {
      return res.status(200).json({ message: "Trade Successfully deleted" });
    }
    return res.status(400).send({ message: "Id is not available" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
