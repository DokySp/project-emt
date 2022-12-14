const model = require("../models");
const crypt = require("../utils/crypt");
const timeTools = require("../utils/time");
const { sequelize } = require("../models");

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
      const pw = crypt.createPassword(data.pw);
      delete data.pw;
      data.pw = pw;

      // issued_at, created 업데이트
      const currTime = timeTools.getCurrentTime();
      data.issued_at = currTime;
      data.created = currTime;

      console.log(data);

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
      data.issued_at = timeTools.getCurrentTime();

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

  //
  //
  //

  //
  //
  //

  getDivision: async (userIdx) => {
    try {
      const query = `SELECT * FROM division AS a INNER JOIN user_division_link AS b ON a.idx = b.division_idx WHERE b.user_idx = ${userIdx};`;
      const [result, metadata] = await sequelize.query(query);

      for (var i = 0; i < result.length; i++) {
        delete result[i].user_idx;
        delete result[i].division_idx;
      }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  createDivisionLink: async (userIdx, divisionIdx) => {
    try {
      let data = {
        user_idx: userIdx,
        division_idx: divisionIdx,
      };

      // 생성
      const result = await model.user_division_link.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteDivisionLink: async (userIdx, divisionIdx) => {
    try {
      let result = await model.user_division_link.destroy({
        where: {
          user_idx: userIdx,
          division_idx: divisionIdx,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  //
  //
  //

  //
  //
  //

  getCourses: async (userIdx) => {
    try {
      const query = `SELECT * FROM course AS a INNER JOIN course_user_link AS b ON a.idx = b.course_idx WHERE b.user_idx = ${userIdx};`;
      const [result, metadata] = await sequelize.query(query);

      for (var i = 0; i < result.length; i++) {
        delete result[i].course_idx;
        delete result[i].user_idx;
        result[i].is_enroll_granted = result[i].is_enroll_granted == 1;
        result[i].is_due_date_implicit = result[i].is_due_date_implicit == 1;
      }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  createCourseUserLink: async (userIdx, courseIdx) => {
    try {
      let data = {
        course_idx: courseIdx,
        user_idx: userIdx,
        started_date: timeTools.getCurrentTime(),
      };

      // 생성
      const result = await model.course_user_link.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteCourseUserLink: async (userIdx, courseIdx) => {
    try {
      let result = await model.course_user_link.destroy({
        where: {
          user_idx: userIdx,
          course_idx: courseIdx,
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = UserService;
