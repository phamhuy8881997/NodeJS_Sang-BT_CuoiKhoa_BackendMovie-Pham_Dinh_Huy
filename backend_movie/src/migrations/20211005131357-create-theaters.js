"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Theaters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      maHeThong: {
        type: Sequelize.STRING,
      },
      maCumRap: {
        type: Sequelize.STRING,
      },
      tenCumRap: {
        type: Sequelize.STRING,
      },
      thongTin: {
        type: Sequelize.STRING,
      },
      hinhAnhRap: {
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
    await queryInterface.dropTable("Theaters");
  },
};
