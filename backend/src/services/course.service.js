const model = require("../models");
const crypt = require("../utils/crypt");
const { sequelize } = require("../models");

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

  //
  //
  //

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

  //
  //
  //

  getUser: async (idx) => {
    try {
      const query = `SELECT last_name, first_name, nickname, email, img, level FROM USER AS a INNER JOIN course_user_link as b ON a.idx = b.user_idx WHERE b.course_idx = ${idx};`;
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
};

module.exports = CourseService;
