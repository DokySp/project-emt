const model = require("../models");
const crypt = require("../utils/crypt");
const { sequelize } = require("../models");

const SubjectsService = {
  get: async (idx) => {
    try {
      let result = await model.subjects.findAll({
        where: { idx },
      });

      for (item of result) {
        // 해당 과제의 파일 검색 후 결과에 추가
        const query = `SELECT a.file_idx AS idx, uuid, fid, name, size, type FROM subjects_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE subjects_idx = ${idx}`;
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
      const result = await model.subjects.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      let result = await model.subjects.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.subjects.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = SubjectsService;
