"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      thongTin: {
        type: Sequelize.STRING,
      },
      imdb: {
        type: Sequelize.INTEGER,
      },
      theLoai: {
        type: Sequelize.STRING,
      },
      quocGia: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      trailer: {
        type: Sequelize.STRING,
      },
      ngayKhoiChieu: {
        type: Sequelize.DATE,
      },
      danhGia: {
        type: Sequelize.INTEGER,
      },
      luotXem: {
        type: Sequelize.INTEGER,
      },
      movieSearch: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Movies");
  },
};
