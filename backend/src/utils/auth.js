const jwt = require("jsonwebtoken");
const secret = require("../../secret/secret");
const model = require("../models");

const auth = {
  createToken: async (payload) => {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret.token.secretKey,
        {
          expiresIn: secret.token.expiresIn,
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            const result = { token };
            resolve(result);
          }
        }
      );
    });
  },

  //
  //
  //

  // checkLev0 (red)
  // checkLev1 (orange)
  // checkLev2 (green)
  // checkSelf (blue)

  // Admin 레벨 확인
  checkLev0: async (req, res, next) => {
    try {
      await auth.check();
      if (req.user.level === 0) {
        next();
      } else {
        throw new Error("Auth fail");
      }
    } catch (err) {
      return res.status(401).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  // 선생님 레벨 확인
  checkLev1: async (req, res, next) => {
    try {
      await auth.check();
      if (req.user.level === 0 || req.user.level === 1) {
        next();
      } else {
        throw new Error("Auth fail");
      }
    } catch (err) {
      return res.status(401).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  // 학생 레벨 확인
  checkLev2: async (req, res, next) => {
    try {
      await auth.check();
      if (req.user.level === 0 || req.user.level === 2) {
        next();
      } else {
        throw new Error("Auth fail");
      }
    } catch (err) {
      return res.status(401).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  // 자기 자신인지 확인
  // TODO: 알고리즘 개선 필요
  checkSelf: async (req, res, next) => {
    try {
      await auth.check(req, res, next);
      next();
    } catch (err) {
      return res.status(401).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  // 사용 금지
  check: async (req, res, next) => {
    try {
      if (
        process.env.NODE_ENV === "development-master" ||
        process.env.NODE_ENV === "production-master"
      ) {
        console.log("!! master auth !!");
        req.token = secret.dummyToken;
      } else {
        req.token = await verification(req, res);
      }

      if (req.token === undefined || req.token === false)
        throw new Error("Auth fail");

      // 사용자 세부 정보를 DB에서 조회 후 반영
      let uResult = await model.user.findOne({
        where: { idx: req.token.idx },
      });
      const userInfo = uResult.dataValues;
      req.user = userInfo;
    } catch (err) {
      return res.status(401).json({
        result: false,
        msg: err.toString(),
      });
    }
  },
};

//
//
//

const verification = async (req, res) => {
  // TODO: 클라이언트 파라미터 퓨전 보완
  let accessToken = req.header("authorization");

  if (accessToken === undefined || accessToken === null) {
    return false;
  } else {
    accessToken = accessToken.split(" ")[1];

    const tokenInfo = await new Promise((resolve, reject) => {
      jwt.verify(accessToken, secret.token.secretKey, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    return tokenInfo;
  }
};

module.exports = auth;
