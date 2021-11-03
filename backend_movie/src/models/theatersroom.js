"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TheatersRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TheatersRoom.init(
    {
      maCumRap: DataTypes.STRING,
      tenPhongChieu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TheatersRoom",
    }
  );
  return TheatersRoom;
};
