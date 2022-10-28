const model = require("../models");
const crypt = require("../utils/crypt");

const DivisionService = {
  get: async (idx) => {
    try {
      const whereClause = {};
      if (idx !== undefined) {
        whereClause["idx"] = idx;
      }

      let result = await model.division.findAll({
        where: whereClause,
      });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  create: async (data) => {
    try {
      const result = await model.division.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      let result = await model.division.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.division.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = DivisionService;
