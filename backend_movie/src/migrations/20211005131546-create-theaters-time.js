"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TheatersTimes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      maPhongChieu: {
        type: Sequelize.INTEGER,
      },
      ngayKhoiChieu: {
        type: Sequelize.DATE,
      },
      maPhim: {
        type: Sequelize.INTEGER,
      },
      giaVe: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("TheatersTimes");
  },
};
