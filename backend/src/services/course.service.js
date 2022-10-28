const model = require("../models");
const crypt = require("../utils/crypt");

const CourseService = {
  get: async (idx) => {
    try {
      const whereClause = {};
      if (idx !== undefined) {
        whereClause["idx"] = idx;
      }

      let result = await model.course.findAll({
        where: whereClause,
      });

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  create: async (data) => {
    try {
      const result = await model.course.create(data);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (idx, data) => {
    try {
      let result = await model.course.update(data, {
        where: { idx: idx },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (idx) => {
    try {
      let result = await model.course.destroy({ where: { idx: idx } });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  getDetail: async (idx) => {
    try {
      const result = await model.course.findOne({
        where: { idx: idx },
      });
      const classes = await model.classes.findAll({
        where: { course_idx: idx },
      });
      const subjects = await model.subjects.findAll({
        where: { course_idx: idx },
      });

      result.dataValues.classes = classes;
      result.dataValues.subjects = subjects;

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = CourseService;
