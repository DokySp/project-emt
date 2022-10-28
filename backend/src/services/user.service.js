const model = require("../models");
const crypt = require("../utils/crypt");

const UserService = {
  getUser: async (idx) => {
    // try {
    //   let result = await model.course.findAll({
    //     // where: whereClause,
    //   });
    //   crypt.createPassword("asdf").then((value) => {
    //     console.log(value);
    //   });
    //   // 비밀번호 지워서 보냄
    //   for (var i = 0; i < result.length; i++) {
    //     delete result[i].dataValues.pw;
    //   }
    //   return result;
    // } catch (err) {
    //   throw new Error(err);
    // }
  },

  createUser: async (instructorData) => {
    // try {
    //   // 이미 있는 ID인지 확인
    //   const checkId = instructorData.id;
    //   const instr = await model.instructor.findOne({
    //     where: { id: checkId },
    //   });
    //   if (instr !== null) {
    //     throw Error("Exist ID");
    //   }
    //   // 회원 생성
    //   const pw = crypt.bCryptCreatePassword(instructorData.pw);
    //   delete instructorData.pw;
    //   instructorData.pw = pw;
    //   // issued_at 업데이트
    //   const now = new Date();
    //   const utc = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    //   instructorData.issued_at = utc;
    //   const result = await model.instructor.create(instructorData);
    //   delete result.dataValues.pw;
    //   return result;
    // } catch (err) {
    //   throw new Error(err);
    // }
  },

  updateUser: async (idx, instructorData) => {
    // try {
    //   // admin이거나 자기 자신일 경우에만 조회 가능
    //   if (!tokenInfo.is_admin && tokenInfo.idx != idx) {
    //     throw new Error("Permission denied");
    //   }
    //   // issued_at 업데이트
    //   const now = new Date();
    //   const utc = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    //   instructorData.issued_at = utc;
    //   let result = await model.instructor.update(instructorData, {
    //     where: { idx: idx },
    //   });
    //   return result;
    // } catch (err) {
    //   throw new Error(err);
    // }
  },

  deleteUser: async (idx) => {
    // // instr: 고객에 강사 FK -> 경고 메시지 띄움
    // try {
    //   let result = await model.instructor.destroy({ where: { idx: idx } });
    //   return result;
    // } catch (err) {
    //   throw new Error(err);
    // }
  },
};

module.exports = UserService;
