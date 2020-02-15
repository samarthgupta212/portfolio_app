'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    avgBuyPrice: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
  }, {});
  Portfolio.associate = (models) => {
    // associations can be defined here
    Portfolio.hasMany(models.PortfolioTrade, {
     as: 'portfolioTrades',
     foreignKey: 'portfolioId',
    });
    Portfolio.belongsTo(models.Stock, {
     as: 'stock',
     foreignKey: 'stockId'
    });
  };
  Portfolio.prototype.getReturn = function() {
    return (100 - this.avgBuyPrice) * this.qty;
  }
  return Portfolio;
};
