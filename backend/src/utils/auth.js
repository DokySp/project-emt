const jwt = require("jsonwebtoken");
const secret = require("../../secret/secret");

const auth = {
  createToken: async (payload) => {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret.secretKey,
        {
          expiresIn: secret.expiresIn,
        },
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  },

  check: async (req, res, next) => {
    if (process.env.NODE_ENV === "development-master") {
      req.tokenInfo = secret.tokenInfo;
      next();
      return;
    }

    try {
      req.tokenInfo = await verification(req, res);

      if (req.tokenInfo === undefined || req.tokenInfo === false)
        throw new Error("Auth fail");

      next();
    } catch (err) {
      return res.status(403).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  checkAdmin: async (req, res, next) => {
    if (process.env.NODE_ENV === "development-master") {
      req.tokenInfo = secret.tokenInfo;
      next();
      return;
    }

    try {
      req.tokenInfo = await verification(req, res);

      if (req.tokenInfo === undefined || req.tokenInfo === false)
        throw new Error("Auth fail");

      if (!req.tokenInfo.is_admin) throw new Error("Permission denied (auth)");

      next();
    } catch (err) {
      return res.status(403).json({
        result: false,
        msg: err.toString(),
      });
    }
  },
};

const verification = async (req, res) => {
  let accessToken = req.header("Authorization");

  if (accessToken === undefined || accessToken === null) {
    return false;
  } else {
    accessToken = accessToken.split(" ")[1];

    const tokenInfo = await new Promise((resolve, reject) => {
      jwt.verify(accessToken, secret.secretKey, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });

    return tokenInfo;
  }
};

// TODO: cidx 없는 경우 query 수정
// body, customer, lesson 함수 통일
const checkSameBranch = async (lidx, cidx) => {
  const { sequelize } = require("../models");

  // -- 강사가 속한 bidx와 고객 b_idx 비교
  query = `SELECT idx from customer
      where b_idx = (select b_idx from instructor where idx = ${lidx}) and idx = ${cidx}`;

  const [lecturerByBody, _] = await sequelize.query(query);

  if (lecturerByBody.length === 0) {
    throw new Error("Permission denied");
  }
};

module.exports = auth;
