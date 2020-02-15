'use strict';
module.exports = (sequelize, DataTypes) => {
  const PortfolioTrade = sequelize.define('PortfolioTrade', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    portfolioId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tradeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    prevQty: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    newQty: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    qty: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    prevAverageBuyPrice: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    newAverageBuyPrice: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    type: {
      type: DataTypes.STRING,
    }
  }, {});
  PortfolioTrade.associate = function(models) {
    // associations can be defined here
    PortfolioTrade.belongsTo(models.Trade, {
      as: "trade",
      foreignKey: "tradeId"
    });
    PortfolioTrade.belongsTo(models.Portfolio, {
      as: "portfolio",
      foreignKey: "portfolioId"
    });
  };
  return PortfolioTrade;
};
