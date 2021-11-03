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
      "TheatersRooms",
      [
        {
          maCumRap: "CGV-CaoThang",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CGV-CaoThang",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CGV-ThuDuc",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CGV-ThuDuc",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "GLX-CaoThang",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "GLX-CaoThang",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "GLX-ThuDuc",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "GLX-ThuDuc",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          maCumRap: "BHD-CaoThang",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "BHD-CaoThang",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "BHD-ThuDuc",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "BHD-ThuDuc",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          maCumRap: "CNT-CaoThang",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CNT-CaoThang",
          tenPhongChieu: "Phong 2",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CNT-ThuDuc",
          tenPhongChieu: "Phong 1",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maCumRap: "CNT-ThuDuc",
          tenPhongChieu: "Phong 2",
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
    await queryInterface.bulkDelete("TheatersRooms", null, {});
  },
};
