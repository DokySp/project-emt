const model = require("../models");
const crypt = require("../utils/crypt");
const { sequelize } = require("../models");

const ClassesService = {
  get: async (idx) => {
    try {
      let result = await model.classes.findAll({
        where: { idx },
      });

      for (item of result) {
        // 해당 수업의 파일 검색 후 결과에 추가
        const query = `SELECT a.file_idx AS idx, uuid, fid, name, size FROM classes_file_link AS a INNER JOIN file AS b ON a.file_idx = b.idx WHERE classes_idx = ${idx}`;
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
      const result = await model.classes.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      let result = await model.classes.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.classes.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = ClassesService;
