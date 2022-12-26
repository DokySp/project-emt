const model = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../../secret/secret");
const crypt = require("../utils/crypt");
const auth = require("../utils/auth");
const timeTools = require("../utils/time");

const AccountService = {
  signin: async (id, pw) => {
    try {
      const sqlRes = await model.user.findOne({
        where: { email: id },
      });

      if (sqlRes === null) {
        throw new Error("Cannot find email");
      }

      const target = sqlRes.dataValues;

      if (target.is_active === false) {
        throw new Error("Deactivated user");
      }

      const isMatch = await crypt.verifyPassword(pw, target.pw);

      if (isMatch) {
        const result = await auth.createToken({
          idx: target.idx,
        });
        return result;
      } else {
        throw new Error("Incorrect password");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  //
  //
  //

  updatePassword: async (idx, pw) => {
    try {
      // 비밀번호 생성
      const pww = await crypt.createPassword(pw);

      // DB 반영
      const result = await AccountService.update(idx, { pw: pww });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateLevel: async (idx, level) => {
    try {
      // DB 반영
      const result = await AccountService.update(idx, { level });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      // issued_at 업데이트
      const currTime = timeTools.getCurrentTime();

      // DB 반영
      const result = await model.user.update(data, { where: { idx } });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = AccountService;
