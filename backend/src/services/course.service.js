const model = require("../models");
const crypt = require("../utils/crypt");
const { sequelize } = require("../models");
const TimeTools = require("../utils/time");

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

      // created_by 강사 닉네임 추가 (created_by_name)
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].dataValues.created_by !== undefined &&
          result[i].dataValues.created_by !== null
        ) {
          let userRes = await model.user.findOne({
            where: { idx: result[i].dataValues.created_by },
          });
          result[i].dataValues.created_by_name = userRes.dataValues.nickname;
        } else {
          result[i].dataValues.created_by_name = undefined;
        }
      }

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

      // classes: order_idx -> section_idx 소팅
      classes.sort((a, b) => {
        if (a.dataValues.order_idx > b.dataValues.order_idx) return 1;
        if (a.dataValues.order_idx == b.dataValues.order_idx) return 0;
        if (a.dataValues.order_idx < b.dataValues.order_idx) return -1;
      });

      classes.sort((a, b) => {
        if (a.dataValues.section_idx > b.dataValues.section_idx) return 1;
        if (a.dataValues.section_idx == b.dataValues.section_idx) return 0;
        if (a.dataValues.section_idx < b.dataValues.section_idx) return -1;
      });

      // subjects: order_idx -> section_idx 소팅
      subjects.sort((a, b) => {
        if (a.dataValues.order_idx > b.dataValues.order_idx) return 1;
        if (a.dataValues.order_idx == b.dataValues.order_idx) return 0;
        if (a.dataValues.order_idx < b.dataValues.order_idx) return -1;
      });

      subjects.sort((a, b) => {
        if (a.dataValues.section_idx > b.dataValues.section_idx) return 1;
        if (a.dataValues.section_idx == b.dataValues.section_idx) return 0;
        if (a.dataValues.section_idx < b.dataValues.section_idx) return -1;
      });

      result.dataValues.classes = classes;
      result.dataValues.subjects = subjects;

      // created_by 강사 닉네임 추가 (created_by_name)
      if (
        result.dataValues.created_by !== undefined &&
        result.dataValues.created_by !== null
      ) {
        let userRes = await model.user.findOne({
          where: { idx: result.dataValues.created_by },
        });
        result.dataValues.created_by_name = userRes.dataValues.nickname;
      } else {
        result.dataValues.created_by_name = undefined;
      }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  getRecommend: async (idx) => {
    try {
      let result = await model.course.findAll({
        where: { is_active: true },
      });

      // 랜덤으로 정렬 후 상위 3개 뽑기
      result.sort(() => 0.5 - Math.random());
      result.splice(3);

      // created_by 강사 닉네임 추가 (created_by_name)
      for (let i = 0; i < result.length; i++) {
        if (
          result[i].dataValues.created_by !== undefined &&
          result[i].dataValues.created_by !== null
        ) {
          let userRes = await model.user.findOne({
            where: { idx: result[i].dataValues.created_by },
          });
          result[i].dataValues.created_by_name = userRes.dataValues.nickname;
        } else {
          result[i].dataValues.created_by_name = undefined;
        }
      }

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
      console.log("sdfsadfs");

      const query = `SELECT a.idx, last_name, first_name, nickname, email, img, level FROM USER AS a INNER JOIN course_user_link as b ON a.idx = b.user_idx WHERE b.course_idx = ${idx};`;
      const [result, metadata] = await sequelize.query(query);

      // for (var i = 0; i < result.length; i++) {
      //   delete result[i].user_idx;
      //   delete result[i].division_idx;
      // }

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = CourseService;
