"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "TheatersLists",
      [
        {
          maHeThong: "CGV",
          tenHeThong: "CGV",
          logo: "CGV.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "GLX",
          tenHeThong: "GALAXY",
          logo: "galaxy.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "BHD",
          tenHeThong: "BHD",
          logo: "BHD.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "CNT",
          tenHeThong: "CN-STAR",
          logo: "cnt.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("TheatersLists", null, {});
  },
};
