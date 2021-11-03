"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movies.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      poster: DataTypes.STRING,
      thongTin: DataTypes.STRING,
      imdb: DataTypes.INTEGER,
      theLoai: DataTypes.STRING,
      quocGia: DataTypes.STRING,
      status: DataTypes.STRING,
      trailer: DataTypes.STRING,
      ngayKhoiChieu: DataTypes.DATE,
      danhGia: DataTypes.INTEGER,
      luotXem: DataTypes.INTEGER,
      movieSearch: DataTypes.STRING,
    },
    {
      sequelize,
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
      modelName: "Movies",
    }
  );
  return Movies;
};
