const model = require("../models");
const crypt = require("../utils/crypt");

const SubmitService = {
  get: async (idx) => {
    try {
      const whereClause = {};
      if (idx !== undefined) {
        whereClause["idx"] = idx;
      }

      let result = await model.submit.findAll({
        where: whereClause,
      });

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
