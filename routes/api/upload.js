const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const multiparty = require("multiparty");
const xlsx = require("xlsx");

const Holders = require("../../models/Holders");

require("dotenv").config();

// @route    GET api/upload/
// @desc     주주명부 조회
// @access   Private
router.get("/", auth, async (req, res) => {
  console.log(req.user.id);

  const holderlist = await Holders.findOne({ corporation: req.user.id }).select(
    "totalStocks"
  );

  console.log(holderlist);

  if (holderlist) {
    res.json(holderlist.totalStocks);
  } else {
    res.json("명부를 등록하지 않았습니다");
  }
});

// @route    POST api/upload/holderlist
// @desc     주주명부 등록
// @access   Private
router.post("/holderlist", async (req, res) => {
  let resData;
  let corporation;
  let totalStocks;

  // https://www.npmjs.com/package/multiparty
  const form = new multiparty.Form({
    autoFiles: true, // 요청이 들어오면 파일을 자동으로 저장할 것인가
    uploadDir: "temp/" // 파일이 저장되는 경로(프로젝트 내의 temp 폴더에 저장됩니다.)
    // maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
  });

  // field 항목에 첨부된 내용
  form.on("field", (name, value) => {
    corporation = JSON.parse(value);
    console.log(corporation)
  });

  // file 항목에 첨부된 내용
  form.on("file", (name, file) => {
    const workbook = xlsx.readFile(file.path);
    const sheetnames = Object.keys(workbook.Sheets);
    // console.log(sheetnames);
    // console.log(workbook.Props);

    resData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetnames]);

    // console.log(sheetData);

    totalStocks = resData.shift().총발행주;

    for (i = 0; i < resData.length; i++) {
      let idNum = resData[i].주민번호;
      console.log(idNum);

      // salt를 생성하여 변수 salt에 담는다.
      let salt = bcrypt.genSaltSync(10);
      // 주민번호와 salt를 이용하여 해쉬화 하고 주민번호에 담는다.
      let hash = bcrypt.hashSync(idNum, salt);
      // console.log(hash);
      resData[i].주민번호 = hash;
    }

    // let i = sheetnames.length;

    // while (i--) {
    //   const sheetname = sheetnames[i];
    //   resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
    //   console.log(resData.Sheet1[i]);
    // }
  });

  // close : 폼 데이타 처리가 모두 완료 되었을 때 실행. 데이터를 취합하여 database에 저장하고 결과 값을 json 형식으로 클라이언트에 전달하자.
  form.on("close", () => {
    console.log(resData);
    // Holders 스키마에 저장될 값을 새로 만든다.
    const newHolders = new Holders({
      corporation: corporation._id,
      corporateName: corporation.corporation.name,
      holders: resData,
      totalStocks: totalStocks
    });
    // console.log(newHolders);

    // STO를 이미 발행한 회사인지 DB에서 확인
    Holders.findOne({ corporation: corporation._id }, (error, user) => {
      // console.log(user);
      if (error) return res.status(500).json({ error: error });
      if (!user) {
        // database에 기록한다.
        const holders = newHolders.save();

        return res.json({
          msg: "주주명부가 등록되었습니다.",
          alertType: "success"
        });
      } else {
        return res.json({
          msg: "주주명부가 이미 등록되었습니다.",
          alertType: "danger"
        });
        // res.send("이미 발행된 회사");
      }
    });
  });

  // track progress 폼 데이타를 업로드 하는 중간중간에 현재 진행 상태를 나타내가 위해서 발생되는 이벤트
  form.on("progress", function(byteRead, byteExpected) {
    console.log(" Reading total  " + byteRead + "/" + byteExpected);
  });

  form.parse(req);
  // form.parse(req, (error, fields, files) => {
  //   console.log(JSON.stringify(fields));
  //   console.log(files);
  //   console.error(error);
  // });
});

module.exports = router;
