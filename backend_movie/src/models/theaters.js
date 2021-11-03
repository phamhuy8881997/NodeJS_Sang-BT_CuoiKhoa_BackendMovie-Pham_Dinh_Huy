"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theaters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Theaters.init(
    {
      maHeThong: DataTypes.STRING,
      maCumRap: DataTypes.STRING,
      tenCumRap: DataTypes.STRING,
      thongTin: DataTypes.STRING,
      hinhAnhRap: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Theaters",
    }
  );
  return Theaters;
};
