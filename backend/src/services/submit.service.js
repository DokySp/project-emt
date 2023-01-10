const model = require("../models");
const crypt = require("../utils/crypt");
const timeTools = require("../utils/time");
const { sequelize } = require("../models");

const SubmitService = {
  get: async (idx) => {
    try {
      let result = await model.submit.findAll({
        where: { idx },
      });

      for (item of result) {
        // 해당 제출 과제의 파일 검색 후 결과에 추가
        const query = `SELECT a.file_idx AS idx, uuid, fid, name, size, type FROM submit_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE submit_idx = ${idx}`;
        const [fResult, _] = await sequelize.query(query);
        item.dataValues["files"] = fResult;
      }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  create: async (data) => {
    try {
      // submitted_time 업데이트
      data.submitted_time = timeTools.getCurrentTime();

      const result = await model.submit.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      let result = await model.submit.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.submit.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = SubmitService;
