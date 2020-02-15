'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    stockId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    qty: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    }
  }, {});
  Trade.associate = function(models) {
    // associations can be defined here
  };
  return Trade;
};
