const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator"); // https://express-validator.github.io/docs/ 사용법

const User = require("../../models/User");

// ???????

// @route    POST api/users
// @desc     Register user // 회원가입
// @access   Public  // 접근권한 모두 가능
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email,
        password
      });

      // salt를 생성하여 변수 salt에 담는다.
      const salt = await bcrypt.genSalt(10);

      // 요청받은 패스워드값과 salt를 이용하여 해쉬화 하고 user.password에 담는다.
      user.password = await bcrypt.hash(password, salt);

      // 데이터 베이스에 저장한다.
      await user.save();

      // 토큰에 저장할 user.id값을 payload 변수에 담는다.
      const payload = {
        user: {
          id: user.id
        }
      };

      // jwt 토큰을 생성하고 에러가 없으면 클라이언트에게 토큰을 전달한다.
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.put(
  "/modify",
  [
    // name값이 없거나 비어있거나, email값이 email형식이 아니거나, password가 6자리 이하면 에러 메시지를 발생시킨다.
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log("왜?");
    console.log(name, email, password);
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "없는 유저인데 어캐했누?" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // salt를 생성하여 변수 salt에 담는다.
      const salt = await bcrypt.genSalt(10);

      // 요청받은 패스워드값과 salt를 이용하여 해쉬화 하고 user.password에 담는다.
      password2 = await bcrypt.hash(password, salt);

      // Update
      const result = await User.updateOne(
        { email: email },
        { $set: { name: name, password: password2 } }
      );
      console.log(result);
      // 토큰에 저장할 user.id값을 payload 변수에 담는다.
      const payload = {
        User: {
          id: User.id
        }
      };

      // jwt 토큰을 생성하고 에러가 없으면 클라이언트에게 토큰을 전달한다.
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/registercorporation",
  [
    // name값이 없거나 비어있거나, email값이 email형식이 아니거나, password가 6자리 이하면 에러 메시지를 발생시킨다.
    check("corporation", "corporation name is required").not(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { corporation, email, password } = req.body;
    console.log(corporation, email, password);

    const user = await User.findOne({ email });

    try {
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "등록되지 않은 사용자입니다" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "패스워드가 맞지 않습니다" }] });
      } else {
        user.corporation = corporation;
        const result = await user.save();
        return res.json(result.corporation);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// 유저 지갑 주소 등록
router.post(
  "/registerwallet",
  [
    // name값이 없거나 비어있거나, email값이 email형식이 아니거나, password가 6자리 이하면 에러 메시지를 발생시킨다.
    check("walletAddress", "walletAddress is required").not()
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { walletAddress, email } = req.body;
    console.log(walletAddress[0].toString(), email);
    const wallet = walletAddress[0].toString();

    const user = await User.findOne({ email });

    try {
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "등록되지 않은 사용자입니다" }] });
      }

      user.walletAddress = wallet;
      console.log(user);
      const result = await user.save();
      return res.json(result.walletAddress);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/my_page", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    return res.send("test");
  }
});

module.exports = router;
