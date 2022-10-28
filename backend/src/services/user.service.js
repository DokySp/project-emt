const model = require("../models");
const crypt = require("../utils/crypt");

const UserService = {
  get: async (idx) => {
    try {
      let result = await model.user.findAll({
        where: { idx: idx },
      });

      // 비밀번호 지워서 보냄
      for (var i = 0; i < result.length; i++) {
        delete result[i].dataValues.pw;
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  create: async (data) => {
    try {
      // 이미 있는 ID인지 확인
      const checkId = data.email;
      const instr = await model.user.findOne({
        where: { email: checkId },
      });
      if (instr !== null) {
        throw Error("Exist ID");
      }
      // 회원 생성
      const pw = crypt.bCryptCreatePassword(data.pw);
      delete data.pw;
      data.pw = pw;

      // issued_at, created 업데이트
      const now = new Date();
      const currTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );
      data.issued_at = currTime;
      data.created = currTime;

      // 생성
      const result = await model.user.create(data);

      // 비번 제거 후 리턴
      delete result.dataValues.pw;
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      // admin이거나 자기 자신일 경우에만 조회 가능
      // if (!tokenInfo.is_admin && tokenInfo.idx != idx) {
      //   throw new Error("Permission denied");
      // }
      // issued_at 업데이트
      const now = new Date();
      const currTime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      );
      data.issued_at = currTime;

      let result = await model.user.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.user.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = UserService;
