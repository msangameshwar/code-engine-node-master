module.exports = (sequelize, Sequelize) => {
  const Trades = sequelize.define("trade", {
    type: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    symbol: {
      type: Sequelize.STRING,
    },
    shares: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  return Trades;
};
