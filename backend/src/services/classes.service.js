const model = require("../models");
const crypt = require("../utils/crypt");

const ClassesService = {
  get: async (idx) => {
    try {
      const whereClause = {};
      if (idx !== undefined) {
        whereClause["idx"] = idx;
      }

      let result = await model.classes.findAll({
        where: whereClause,
      });

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
