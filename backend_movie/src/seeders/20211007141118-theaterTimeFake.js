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
      "TheatersTimes",
      [
        {
          id: 2222,
          maPhongChieu: 1,
          ngayKhoiChieu: "2021-09-18T16:09:00",
          maPhim: 1,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2223,
          maPhongChieu: 1,
          ngayKhoiChieu: "2021-09-19T16:09:00",
          maPhim: 1,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          id: 2224,
          maPhongChieu: 2,
          ngayKhoiChieu: "2021-09-20T16:09:00",
          maPhim: 2,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2225,
          maPhongChieu: 2,
          ngayKhoiChieu: "2021-09-21T16:09:00",
          maPhim: 2,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          id: 2226,
          maPhongChieu: 3,
          ngayKhoiChieu: "2021-09-20T18:09:00",
          maPhim: 3,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2227,
          maPhongChieu: 3,
          ngayKhoiChieu: "2021-09-21T22:09:00",
          maPhim: 3,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          id: 2228,
          maPhongChieu: 4,
          ngayKhoiChieu: "2021-09-20T18:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2229,
          maPhongChieu: 4,
          ngayKhoiChieu: "2021-09-21T22:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          id: 2230,
          maPhongChieu: 5,
          ngayKhoiChieu: "2021-09-20T18:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2231,
          maPhongChieu: 5,
          ngayKhoiChieu: "2021-09-21T22:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
        {
          id: 2232,
          maPhongChieu: 16,
          ngayKhoiChieu: "2021-09-20T18:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        {
          id: 2233,
          maPhongChieu: 16,
          ngayKhoiChieu: "2021-09-21T22:09:00",
          maPhim: 4,
          giaVe: "95000",
          createdAt: "2021-08-12 08:30:00",
          updatedAt: "2021-08-12 08:30:00",
        },
        //
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
    await queryInterface.bulkDelete("TheatersTimes", null, {});
  },
};
