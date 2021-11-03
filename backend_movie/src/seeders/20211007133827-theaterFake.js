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
      "Theaters",
      [
        {
          maHeThong: "CGV",
          maCumRap: "CGV-CaoThang",
          tenCumRap: "CGV Cao Thang Q 3",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "CGV",
          maCumRap: "CGV-ThuDuc",
          tenCumRap: "CGV quan 9 Thu Duc",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "GLX",
          maCumRap: "GLX-CaoThang",
          tenCumRap: "galaxy cao thang quan 3",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "GLX",
          maCumRap: "GLX-ThuDuc",
          tenCumRap: "galaxy quan 9 thu duc",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "BHD",
          maCumRap: "BHD-CaoThang",
          tenCumRap: "bhd cao thang quan 3",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "BHD",
          maCumRap: "BHD-ThuDuc",
          tenCumRap: "bhd thu duc quan 9",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "CNT",
          maCumRap: "CNT-CaoThang",
          tenCumRap: "cn-star cao thang quan 3",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          maHeThong: "CNT",
          maCumRap: "CNT-ThuDuc",
          tenCumRap: "cn-star thu duc quan 9",
          thongTin: "chua co",
          hinhAnhRap: "a.jpg",
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
    await queryInterface.bulkDelete("Theaters", null, {});
  },
};
