'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
    	allowNull: false,
    	type: DataTypes.STRING,
    },
    ticker: {
    	allowNull: false,
    	type: DataTypes.STRING,
    }
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
  };
  return Stock;
};
