"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TheatersList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TheatersList.init(
    {
      maHeThong: DataTypes.STRING,
      tenHeThong: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TheatersList",
    }
  );
  return TheatersList;
};
