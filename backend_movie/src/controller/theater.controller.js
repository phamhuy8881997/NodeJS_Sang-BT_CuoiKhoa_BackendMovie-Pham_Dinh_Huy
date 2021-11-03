require("dotenv").config();
const {
  TheatersList,
  Theaters,
  TheatersRoom,
  TheatersTime,
  TheatersChair,
  sequelize,
  Movies,
  Tickers,
} = require("../models");
var fs = require("fs");
//TheatersList  -- table CumRap
//Theaters      -- table RapChieu
//TheatersRoom  -- table PhongChieu
//TheatersTime  -- table LichChieu
//TheatersChair -- table GheNgoi
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---lay danh sach he thong------------------------------------------
const findAllTheaterList = async (req, res) => {
  try {
    const theaterList = await TheatersList.findAll();
    res.status(200).send(theaterList);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---them moi he thong rap-------------------------------------------
const createTheaterList = async (req, res) => {
  try {
    const { maHeThong, tenHeThong, logo } = req.body;
    const { file } = req;
    const urlImage = `${process.env.URL_DEPLOY}/${file.path}`;
    //------
    const query1 = `select * from theaterslists`;
    const [resole] = await sequelize.query(query1);
    let testKey = [];
    resole.forEach((elm) => {
      if (elm.maHeThong.toLowerCase() === maHeThong.toLowerCase()) {
        testKey.push(elm);
      }
    });
    //-------
    let newItem = "";
    if (testKey.length > 0) {
      newItem = ["ma he thong da ton tai"];
    } else {
      newItem = await TheatersList.create({
        maHeThong,
        tenHeThong,
        logo: urlImage,
      });
    }
    res.status(200).send(newItem);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
      error,
    });
  }
};
//---xoa he thong rap------------------------------------------------
const deleteTheaterList = async (req, res) => {
  try {
    const { maHeThong } = req.params;
    const getTheater = await TheatersList.findOne({
      where: {
        maHeThong,
      },
    });
    if (getTheater) {
      //------delete image-------
      const imageTheaterList = getTheater.logo.split("/");
      const imageTheaterListRemove =
        imageTheaterList[imageTheaterList.length - 1];

      fs.unlink(imageTheaterListRemove, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      //-------------------------
      const query = `select * from theaters where maHeThong = "${maHeThong}"`;
      const [resule] = await sequelize.query(query);
      //-------------------------
      for (let i = 0; i < resule.length; i++) {
        const query1 = `select * from theatersrooms where maCumRap= "${resule[i].maCumRap}"`;
        const [resule1] = await sequelize.query(query1);
        //--------
        if (resule1) {
          for (let j = 0; j < resule1.length; j++) {
            const query2 = `select * from theaterstimes where maPhongChieu = "${resule1[j].id}"`;
            const [resule2] = await sequelize.query(query2);
            //--------
            if (resule2) {
              for (let k = 0; k < resule2.length; k++) {
                const query3 = `select * from theaterschairs where maLichChieu = "${resule2[k].id}"`;
                const [resule3] = await sequelize.query(query3);
                //-------
                if (resule3) {
                  for (let m = 0; m < resule3.length; m++) {
                    const delete4 = await TheatersChair.destroy({
                      where: {
                        id: resule3[m].id,
                      },
                    });
                  }
                }
                //-------
                const delete3 = await TheatersTime.destroy({
                  where: {
                    id: resule2[k].id,
                  },
                });
              }
            }
            //--------
            const delete2 = await TheatersRoom.destroy({
              where: { id: resule1[j].id },
            });
          }
        }
        //-------
        //---delete image---------------
        const imageTheater = resule[i].hinhAnhRap.split("/");
        const imageTheaterRemove = imageTheater[imageTheater.length - 1];
        fs.unlink(imageTheaterRemove, function (err) {
          if (err) throw err;
          console.log("File deleted!");
        });
        //---delete image---------------
        const delete1 = await Theaters.destroy({
          where: {
            id: resule[i].id,
          },
        });
      }
      //-------------------------
      const removeTheater = await TheatersList.destroy({
        where: {
          maHeThong,
        },
      });
      //-------------------------
      res.status(200).send(getTheater);
    } else {
      res.send({ message: " ma he thong khong ton tai" });
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server",
      error,
    });
  }
};
//---xoa he thong 1 -------------------------------------------------
const removeTheaterList = async (req, res) => {
  try {
    const { maHeThong } = req.params;
    const getTheaterListOne = await TheatersList.findOne({
      where: {
        maHeThong,
      },
    });
    if (getTheaterListOne) {
      //------delete image-------
      const imageTheaterList = getTheaterListOne.logo.split("/");
      const imageTheaterListRemove =
        imageTheaterList[imageTheaterList.length - 1];

      fs.unlink(imageTheaterListRemove, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      //-------------------------
      await TheatersList.destroy({
        where: {
          maHeThong,
        },
      });
      res.status(200).send(getTheaterListOne);
    } else {
      res.status(200).send({ message: "ma he thong khong ton tai" });
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server 500",
    });
  }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---lay cum rap theo ma he thong------------------------------------
const findAllTheater = async (req, res) => {
  try {
    const { maHeThong } = req.params;
    const theater = await Theaters.findAll({
      where: {
        maHeThong,
      },
    });
    res.status(200).send(theater);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---them moi cum rap------------------------------------------------
const createTheater = async (req, res) => {
  try {
    const { maHeThong, maCumRap, tenCumRap, thongTin, hinhAnhRap } = req.body;
    const { file } = req;
    const urlImage = `${process.env.URL_DEPLOY}/${file.path}`;
    //------
    const query1 = `select * from theaterslists`;
    const [resole1] = await sequelize.query(query1);
    const query2 = `select * from theaters`;
    const [resole2] = await sequelize.query(query2);
    //--------
    let testKey1 = []; // kiem tra maHeThong
    let testKey2 = []; // kiem tra maCumRap
    //--------
    resole1.forEach((elm1) => {
      if (elm1.maHeThong.toLowerCase() === maHeThong.toLowerCase()) {
        testKey1.push(elm1);
      }
    });
    resole2.forEach((elm2) => {
      if (elm2.maCumRap.toLowerCase() === maCumRap.toLowerCase()) {
        testKey2.push(elm2);
      }
    });
    //--------
    let newItem1 = "";
    if (testKey1.length > 0) {
      if (testKey2.length > 0) {
        newItem1 = [{ message: "maCumRap Đã Tồn Tại. Hãy Dùng maCumRap Khác" }];
      } else {
        newItem1 = await Theaters.create({
          maHeThong,
          maCumRap,
          tenCumRap,
          thongTin,
          hinhAnhRap: urlImage,
        });
      }
    } else {
      newItem1 = [{ message: "maHeThong Không Tồn Tại !!" }];
    }
    res.status(200).send(newItem1);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
      error,
    });
  }
};
//---xoa cum rap all ------------------------------------------------
const deleteTheater = async (req, res) => {
  try {
    const { maCumRap } = req.params;
    const deleteResule = await Theaters.findAll({
      where: {
        maCumRap,
      },
    });
    //------delete image-------
    const getTheaterOne = await Theaters.findOne({
      where: {
        maCumRap,
      },
    });
    const imageTheater = getTheaterOne.hinhAnhRap.split("/");
    const imageTheaterRemove = imageTheater[imageTheater.length - 1];

    fs.unlink(imageTheaterRemove, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
    //-------------------------
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const query1 = `select * from theatersrooms where maCumRap= "${maCumRap}"`;
    const [resule1] = await sequelize.query(query1);
    //--------
    if (resule1) {
      for (let j = 0; j < resule1.length; j++) {
        const query2 = `select * from theaterstimes where maPhongChieu = "${resule1[j].id}"`;
        const [resule2] = await sequelize.query(query2);
        //--------
        if (resule2) {
          for (let k = 0; k < resule2.length; k++) {
            const query3 = `select * from theaterschairs where maLichChieu = "${resule2[k].id}"`;
            const [resule3] = await sequelize.query(query3);
            //-------
            if (resule3) {
              for (let m = 0; m < resule3.length; m++) {
                const delete4 = await TheatersChair.destroy({
                  where: {
                    id: resule3[m].id,
                  },
                });
              }
            }
            //-------
            const delete3 = await TheatersTime.destroy({
              where: {
                id: resule2[k].id,
              },
            });
          }
        }
        //--------
        const delete2 = await TheatersRoom.destroy({
          where: { id: resule1[j].id },
        });
      }
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const deleteItem = await Theaters.destroy({
      where: {
        maCumRap,
      },
    });
    res.status(200).send(deleteResule);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
      error,
    });
  }
};
//---xoa cum rap 1 --------------------------------------------------
const removeTheater = async (req, res) => {
  try {
    const { maCumRap } = req.params;
    const getTheaterOne = await Theaters.findOne({
      where: { maCumRap },
    });
    if (getTheaterOne) {
      //------delete image-------
      const imageTheater = getTheaterOne.hinhAnhRap.split("/");
      const imageTheaterRemove = imageTheater[imageTheater.length - 1];

      fs.unlink(imageTheaterRemove, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      //-------------------------
      await Theaters.destroy({
        where: { maCumRap },
      });
      res.status(200).send(getTheaterOne);
    } else {
      res.status(404).send({ message: "ma cum rap khong ton tai" });
    }
    //res.send(getTheaterOne);
  } catch (error) {
    res.status(404).send({ message: "loi server 500", error });
  }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---lay phong chieu theo ma cum rap---------------------------------
const findAllTheaterRoom = async (req, res) => {
  try {
    const { maCumRap } = req.params;
    const theaterRoom = await TheatersRoom.findAll({
      where: {
        maCumRap,
      },
    });
    res.status(200).send(theaterRoom);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---them phong chieu -----------------------------------------------
const createTheaterRoom = async (req, res) => {
  try {
    const { maCumRap, tenPhongChieu } = req.body;
    const query2 = `select * from theaters`;
    const [resole2] = await sequelize.query(query2);
    const query3 = `select * from theatersrooms`;
    const [resole3] = await sequelize.query(query3);
    let testKey2 = []; // kiem tra cumrap
    let testKey3 = []; // filter tat ca cum rap = maCumRap
    let testKey4 = []; // kiem tra ten phong chieu có trùng
    resole2.forEach((el) => {
      if (el.maCumRap.toLowerCase() === maCumRap.toLowerCase()) {
        testKey2.push(el);
      }
    });
    resole3.forEach((el) => {
      if (el.maCumRap.toLowerCase() === maCumRap.toLowerCase()) {
        testKey3.push(el);
      }
    });
    testKey3.forEach((el) => {
      if (el.tenPhongChieu.toLowerCase() === tenPhongChieu.toLowerCase()) {
        testKey4.push(el);
      }
    });
    //-----------------------------------------------
    let newItem1 = "";
    if (testKey2.length > 0) {
      if (testKey3.length > 0) {
        if (testKey4.length > 0) {
          newItem1 = {
            message: "Tên Phòng Chiếu Đã Tồn Tại. Vui Lòng Dùng Tên Khác",
          };
        } else {
          newItem1 = await TheatersRoom.create({
            maCumRap,
            tenPhongChieu,
          });
        }
      } else {
        newItem1 = await TheatersRoom.create({
          maCumRap,
          tenPhongChieu,
        });
      }
    } else {
      newItem1 = {
        message: "cụm rạp không tồn tại. vui lòng kiểm tra lại mã cụm rạp",
      };
    }
    res.status(200).send(newItem1);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---xoa phong chieu-------------------------------------------------
const deleteTheaterRoom = async (req, res) => {
  try {
    const { maPhongChieu } = req.params;
    const deletePhongChieu = await TheatersRoom.findByPk(maPhongChieu);
    if (deletePhongChieu) {
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      const query2 = `select * from theaterstimes where maPhongChieu = "${maPhongChieu}"`;
      const [resule2] = await sequelize.query(query2);
      //--------
      if (resule2) {
        for (let k = 0; k < resule2.length; k++) {
          const query3 = `select * from theaterschairs where maLichChieu = "${resule2[k].id}"`;
          const [resule3] = await sequelize.query(query3);
          //-------
          if (resule3) {
            for (let m = 0; m < resule3.length; m++) {
              const delete4 = await TheatersChair.destroy({
                where: {
                  id: resule3[m].id,
                },
              });
            }
          }
          //-------
          const delete3 = await TheatersTime.destroy({
            where: {
              id: resule2[k].id,
            },
          });
        }
      }
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      const deletePhongChieu1 = await TheatersRoom.destroy({
        where: {
          id: maPhongChieu,
        },
      });
      res.status(200).send(deletePhongChieu);
    } else {
      res.status(404).send({ message: " maPhongChieu Không Tồn Tại. !!" });
    }
  } catch (error) {
    res.status(500).send({ message: "loi server", error });
  }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---them lich chieu-------------------------------------------------
const createTimeMovie = async (req, res) => {
  try {
    const { maPhongChieu, ngayKhoiChieu, maPhim, giaVe } = req.body;
    const idPhim = await Movies.findByPk(maPhim);
    if (idPhim) {
      const idPhongChieu = await TheatersRoom.findByPk(maPhongChieu);
      if (idPhongChieu) {
        const query = `select * from theaterstimes where maPhongChieu = ${maPhongChieu}`;
        const [resule] = await sequelize.query(query);
        let arrtest = [];
        // kiem tra ngay khoi chieu co trung hay ko--------------------
        if (resule) {
          resule.forEach((el) => {
            let fomatTime1 = new Date(
              Date.parse(el.ngayKhoiChieu) + 60 * 60 * 1000 * 10
            ).toJSON();
            // to Json UTC - 7 ==> bù 7 thêm 3h mới = 10
            if (ngayKhoiChieu <= fomatTime1) {
              arrtest.push(el);
            }
          });
        }
        //console.log("arr:", arrtest);
        // xac nhan qua trinh up lich chieu ---------------------------
        if (arrtest.length > 0) {
          // nếu ngày khởi chiếu <= thông báo
          let dateTemp1 = new Date(
            Date.parse(arrtest[0].ngayKhoiChieu) + 60 * 60 * 1000 * 7
          ).toJSON();
          let dateTemp2 = new Date(
            Date.parse(arrtest[0].ngayKhoiChieu) + 60 * 60 * 1000 * 11
          ).toJSON();
          res.status(200).send({
            message: `Lịch Chiếu Bị Trùng !! `,
            next: `Lịch Chiếu Phải Lớn Hơn ${dateTemp1} + 3 hours, Ví Dụ: ${dateTemp2} `,
          });
        } else {
          let fomatTime2 = new Date(
            Date.parse(ngayKhoiChieu) - 60 * 60 * 1000 * 7
          ).toJSON(); // fomat UTC 0
          const createTime = await TheatersTime.create({
            maPhongChieu,
            ngayKhoiChieu: fomatTime2,
            maPhim,
            giaVe,
          });
          // tìm phòng chiếu --> tìm mã lịch chiếu
          const queryA = `select * from theaterstimes where maPhongChieu = ${maPhongChieu}`;
          const [resuleA] = await sequelize.query(queryA);
          let arrCreateChair = [];
          resuleA.forEach((elA) => {
            if (Date.parse(elA.ngayKhoiChieu) === Date.parse(fomatTime2)) {
              arrCreateChair.push(elA);
            }
          });
          //res.send(arrCreateChair);
          //lấy mã lịch chiếu tạo ghế
          const idTimeChair = arrCreateChair[0].id;
          console.log(idTimeChair);
          for (let i = 1; i < 21; i++) {
            const createChair = await TheatersChair.create({
              maLichChieu: idTimeChair,
              tenGhe: i,
              status: false,
            });
          }
          res.status(200).send(arrCreateChair);
        }
      } else {
        res.status(200).send({
          message: "Mã Phòng Chiếu Không Tồn Tại",
          next: "Vui Lòng Kiểm Tra lại Mã Phòng Chiếu",
        });
      }
    } else {
      res.status(200).send({
        message: "Mã Phim Không Tại",
        next: "Vui Lòng Kiểm Tra lại Mã Phim",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "loi server 500 " });
  }
};
//---xoa lich chieu--------------------------------------------------
const deleteTimeMovie = async (req, res) => {
  try {
    const { DetailsInfo } = req;
    if (DetailsInfo) {
      const deleteTime = await TheatersTime.destroy({
        where: {
          id: DetailsInfo.id,
        },
      });
      const query11 = `select * from theaterschairs where maLichChieu = ${DetailsInfo.id}`;
      const [resule11] = await sequelize.query(query11);
      for (let i = 0; i < resule11.length; i++) {
        const deleteChair = await TheatersChair.destroy({
          where: {
            id: resule11[i].id,
          },
        });
        const deleteTicker = await Tickers.destroy({
          where: {
            maGhe: resule11[i].id,
          },
        });
      }
      res.status(200).send(DetailsInfo);
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server 500",
    });
  }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---lay toan bo he thong tu a-->z-----------------------------------
const findAll_AZ = async (req, res) => {
  try {
    const query1 = `select * from theaterslists`;
    const query2 = `select * from theaters`;
    const query3 = `select * from theatersrooms`;
    const query4 = `select * from theaterstimes`;
    const query5 = `select * from theaterschairs`;
    const [resules1] = await sequelize.query(query1);
    const [resules2] = await sequelize.query(query2);
    const [resules3] = await sequelize.query(query3);
    const [resules4] = await sequelize.query(query4);
    const [resules5] = await sequelize.query(query5);
    let arrResule = [];
    resules1.forEach((el1) => {
      let new1 = { ...el1, danhSachCumRap: [] };
      resules2.forEach((el2) => {
        if (el2.maHeThong === el1.maHeThong) {
          let new2 = { ...el2, danhSachPhongChieu: [] };
          new1.danhSachCumRap.push(new2);
          //---
          resules3.forEach((el3) => {
            if (el3.maCumRap === el2.maCumRap) {
              let new3 = { ...el3, danhSachLichChieu: [] };
              new2.danhSachPhongChieu.push(new3);
              //---
              resules4.forEach((el4) => {
                if (el4.maPhongChieu === el3.id) {
                  let new4 = { ...el4, danhSachGhe: [] };
                  new3.danhSachLichChieu.push(new4);
                  //---
                  resules5.forEach((el5) => {
                    if (el5.maLichChieu === new4.id) {
                      let new5 = { ...el5 };
                      new4.danhSachGhe.push(new5);
                    }
                  });
                }
              });
            }
          });
        }
      });
      arrResule.push(new1);
    });
    res.status(200).send(arrResule);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---lay toan bo cum rap theo ma he thong----------------------------
const findAll_theaterList_AZ = async (req, res) => {
  const { maHeThong } = req.params;
  try {
    const query1 = `select * from theaterslists where theaterslists.maHeThong = "${maHeThong}" `;
    const [resules1] = await sequelize.query(query1);
    if (resules1) {
      const query2 = `select * from theaters`;
      const query3 = `select * from theatersrooms`;
      const query4 = `select * from theaterstimes`;
      const query5 = `select * from theaterschairs`;
      const [resules2] = await sequelize.query(query2);
      const [resules3] = await sequelize.query(query3);
      const [resules4] = await sequelize.query(query4);
      const [resules5] = await sequelize.query(query5);
      let arrResule = [];
      resules1.forEach((el1) => {
        let new1 = { ...el1, danhSachCumRap: [] };
        resules2.forEach((el2) => {
          if (el2.maHeThong === el1.maHeThong) {
            let new2 = { ...el2, danhSachPhongChieu: [] };
            new1.danhSachCumRap.push(new2);
            //---
            resules3.forEach((el3) => {
              if (el3.maCumRap === el2.maCumRap) {
                let new3 = { ...el3, danhSachLichChieu: [] };
                new2.danhSachPhongChieu.push(new3);
                //---
                resules4.forEach((el4) => {
                  if (el4.maPhongChieu === el3.id) {
                    let new4 = { ...el4, danhSachGhe: [] };
                    new3.danhSachLichChieu.push(new4);
                    //---
                    resules5.forEach((el5) => {
                      if (el5.maLichChieu === new4.id) {
                        let new5 = { ...el5 };
                        new4.danhSachGhe.push(new5);
                      }
                    });
                  }
                });
              }
            });
          }
        });
        arrResule.push(new1);
      });
      res.status(200).send(arrResule);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---lay toan bo phong chieu theo ma cum rap-------------------------
const findAll_theaterRoom_AZ = async (req, res) => {
  try {
    const { maCumRap } = req.params;
    const query1 = `select * from theaters where maCumRap = "${maCumRap}"`;
    const [resules1] = await sequelize.query(query1);
    if (resules1.length > 0) {
      const query2 = `select * from theatersrooms where maCumRap = "${maCumRap}"`;
      const [resules2] = await sequelize.query(query2);
      const query3 = `select * from theaterstimes`;
      const [resules3] = await sequelize.query(query3);
      const query4 = `select * from theaterschairs`;
      const [resules4] = await sequelize.query(query4);
      let arrResule1 = [];
      let arrTemp1 = { ...resules1[0], danhSachPhongChieu: [] };
      //------
      resules2.forEach((el2) => {
        let arrT1 = { ...el2, danhSachLichChieu: [] };
        resules3.forEach((el3) => {
          if (el3.maPhongChieu === arrT1.id) {
            let arrT2 = { ...el3, danhSachGhe: [] };
            resules4.forEach((el4) => {
              if (el4.maLichChieu === arrT2.id) {
                let arrT3 = { ...el4 };
                arrT2.danhSachGhe.push(arrT3);
              }
            });
            arrT1.danhSachLichChieu.push(arrT2);
          }
        });
        arrTemp1.danhSachPhongChieu.push(arrT1);
      });
      //---------
      arrResule1.push(arrTemp1);
      res.status(200).send(arrResule1);
    } else {
      res.status(404).send({ message: "khong tim maCumRap" });
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server 500 ",
      error,
    });
  }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---dat ve----------------------------------------------------------
const booking = async (req, res) => {
  try {
    const data = req.body;
    const { user } = req;
    const arrTicker = [];
    for (let i = 0; i < data.length; i++) {
      const setTicker = await TheatersChair.findByPk(data[i].maGhe);
      if (setTicker.status === true) {
      } else {
        setTicker.status = true;
        await setTicker.save();
        await Tickers.create({
          userID: user.id,
          maGhe: data[i].maGhe,
        });
        arrTicker.push(setTicker);
      }
    }
    res.status(200).send(arrTicker);
  } catch (error) {
    res.status(500).send({
      message: "loi server 500 ",
      error,
    });
  }
};
//---danh sach lich chieu theo movie all-----------------------------
const Movie_Time_AZ = async (req, res) => {
  const { maHeThong } = req.params;
  try {
    const query1 = `select * from theaterslists where theaterslists.maHeThong = "${maHeThong}" `;
    const [resules1] = await sequelize.query(query1);
    if (resules1) {
      const query2 = `select * from theaters`;
      const query3 = `select * from theatersrooms`;
      const query4 = `select * from theaterstimes`;
      const query5 = `select movies.id,movies.image,movies.name from movies`;
      const [resules2] = await sequelize.query(query2);
      const [resules3] = await sequelize.query(query3);
      const [resules4] = await sequelize.query(query4);
      const [resules5] = await sequelize.query(query5);
      let arrResule = [];
      resules1.forEach((el1) => {
        let new1 = { ...el1, danhSachCumRap: [] };
        resules2.forEach((el2) => {
          if (el2.maHeThong === el1.maHeThong) {
            let new2 = { ...el2, danhSachPhongChieu: [] };
            new1.danhSachCumRap.push(new2);
            //---
            resules3.forEach((el3) => {
              if (el3.maCumRap === el2.maCumRap) {
                let new3 = { ...el3, danhSachLichChieu: [] };
                new2.danhSachPhongChieu.push(new3);
                //---
                resules5.forEach((el5) => {
                  let new4 = { ...el5, lichChieu: [] };
                  resules4.forEach((el4) => {
                    if (
                      el4.maPhongChieu === new3.id &&
                      el4.maPhim === new4.id
                    ) {
                      new4.lichChieu.push(el4);
                    }
                  });
                  if (new4.lichChieu.length > 0) {
                    new3.danhSachLichChieu.push(new4);
                  }
                });
              }
            });
          }
        });
        arrResule.push(new1);
      });
      res.status(200).send(arrResule);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({
      message: "loi server",
    });
  }
};
//---danh sach lich chieu theo movie id------------------------------
const ShowTime = async (req, res) => {
  try {
    const { id } = req.params;
    const queryA = `
    SELECT theaterstimes.id as maLichChieu, theaterstimes.ngayKhoiChieu,
    theaterstimes.giaVe,theaterstimes.maPhim,
    theatersrooms.maCumRap,theatersrooms.tenPhongChieu,
    theaters.maHeThong,theaters.tenCumRap,theaters.hinhAnhRap
    FROM theaterstimes
    left join theatersrooms
    on theatersrooms.id = theaterstimes.maPhongChieu
    left join theaters
    on theaters.maCumRap = theatersrooms.maCumRap
    where theaterstimes.maPhim =${id};`;
    const [resuleA] = await sequelize.query(queryA);
    res.status(200).send(resuleA);
  } catch (error) {
    res.status(500).send({
      message: "loi server",
      error,
    });
  }
};
//---danh sach ghe theo ma lich chieu--------------------------------
const ListChair = async (req, res) => {
  try {
    const maLichChieu = req.params.id;
    const queryA = `SELECT theaterschairs.id as maGhe, theaterschairs.maLichChieu,
     theaterschairs.tenGhe, theaterschairs.status, theaterstimes.maPhim FROM theaterschairs
      left join theaterstimes
      on theaterstimes.id = theaterschairs.maLichChieu where maLichChieu = ${maLichChieu}`;
    const [resuleA] = await sequelize.query(queryA);
    const queryB = `select * from movies where id = ${resuleA[0].maPhim}`;
    const [resuleB] = await sequelize.query(queryB);
    const resuleC = [{ thongTin: resuleB[0], danhSachGhe: [...resuleA] }];
    res.status(200).send(resuleC);
  } catch (error) {
    res.status(500).send({
      message: "Lỗi Server 500",
      error,
    });
  }
};
//---dat ve nhanh----------------------------------------------------
const bookingNow = async (req, res) => {
  try {
    const { id } = req.params;
    const queryA = `
    SELECT theaterstimes.id as maLichChieu, theaterstimes.ngayKhoiChieu,
    theaterstimes.giaVe,theaterstimes.maPhim,
    theatersrooms.maCumRap,theatersrooms.tenPhongChieu,theatersrooms.id as maPhongChieu,
    theaters.maHeThong,theaters.tenCumRap,theaters.hinhAnhRap
    FROM theaterstimes
    left join theatersrooms
    on theatersrooms.id = theaterstimes.maPhongChieu
    left join theaters
    on theaters.maCumRap = theatersrooms.maCumRap
    where theaterstimes.maPhim =${id};
    `;
    const [resuleA] = await sequelize.query(queryA);
    const queryB = `select * from theaterslists`;
    const [resuleB] = await sequelize.query(queryB);
    const queryC = `select * from theaters`;
    const [resuleC] = await sequelize.query(queryC);
    const queryD = `select * from theatersrooms`;
    const [resuleD] = await sequelize.query(queryD);
    const queryE = `select * from theaterstimes`;
    const [resuleE] = await sequelize.query(queryE);
    let arrResule = [];
    let test1 = []; // kiem tra he thong rap co chieu
    let test2 = []; // kiem tra cum rap co chieu
    let test3 = []; // kiem tra phong chieu co chieu
    let test4 = []; // kiem tra lich chieu co
    //-----------
    resuleB.forEach((elmB) => {
      let new1 = { ...elmB, danhsachCumRap: [] };
      //----1
      resuleC.forEach((elmC) => {
        let new2 = { ...elmC, danhSachPhongChieu: [] };
        //----2
        resuleD.forEach((elmD) => {
          let new3 = { ...elmD, suatChieu: [] };
          //----3
          resuleE.forEach((elmE) => {
            let new4 = { ...elmE };
            //---4
            resuleA.forEach((elmF) => {
              if (
                elmF.maPhongChieu === new3.id &&
                elmF.maLichChieu === new4.id
              ) {
                test4.push(elmF);
              }
            });
            if (test4.length > 0) {
              new3.suatChieu.push(new4);
              test4 = [];
            }
            //---4
          });
          //----3
          resuleA.forEach((elmK) => {
            if (
              elmK.maCumRap === new2.maCumRap &&
              elmK.maPhongChieu === new3.id
            ) {
              test3.push(elmK);
            }
          });
          if (test3.length > 0) {
            new2.danhSachPhongChieu.push(new3);
            test3 = [];
          }
          //----3
        });
        //----2
        resuleA.forEach((elmJ) => {
          if (
            elmJ.maHeThong === new1.maHeThong &&
            elmJ.maCumRap === new2.maCumRap
          ) {
            test2.push(elmJ);
          }
        });
        if (test2.length > 0) {
          new1.danhsachCumRap.push(new2);
          test2 = [];
        }
        //----2
      });
      //----1
      resuleA.forEach((elmI) => {
        if (elmI.maHeThong === new1.maHeThong) {
          test1.push(elmI);
        }
      });
      if (test1.length > 0) {
        arrResule.push(new1);
        test1 = [];
      }
      //----1
    });
    res.status(200).send(arrResule);
  } catch (error) {
    res.status(500).send({
      message: "loi sever",
      error,
    });
  }
};
module.exports = {
  findAllTheaterList,
  createTheaterList,
  deleteTheaterList,
  removeTheaterList,
  findAllTheater,
  createTheater,
  deleteTheater,
  removeTheater,
  findAllTheaterRoom,
  createTheaterRoom,
  deleteTheaterRoom,
  createTimeMovie,
  deleteTimeMovie,
  findAll_AZ,
  findAll_theaterList_AZ,
  findAll_theaterRoom_AZ,
  booking,
  Movie_Time_AZ,
  ShowTime,
  ListChair,
  bookingNow,
};
