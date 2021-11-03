'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tickers.init({
    userID: DataTypes.INTEGER,
    maGhe: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tickers',
  });
  return Tickers;
};