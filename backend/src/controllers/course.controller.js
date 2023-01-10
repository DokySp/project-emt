const CourseService = require("../services/course.service");

const CourseController = {
  get: async (req, res, next) => {
    try {
      const result = await CourseService.get(req.query.idx);

      if (result.length === 0) {
        throw new Error("Empty set");
      }

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  create: async (req, res, next) => {
    let data = req.body;
    delete data.idx;
    data.is_active = true;

    try {
      const result = await CourseService.create(data);

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  update: async (req, res, next) => {
    const data = req.body;
    const idx = Number.parseInt(req.query.idx);
    delete data.idx;
    delete data.is_active;

    try {
      if (Object.keys(data).length === 0) {
        throw new Error("Not effected");
      }

      const result = await CourseService.update(idx, data);

      if (result[0] === 0) {
        throw new Error("Not effected");
      }

      return res.status(200).json({
        result: result[0],
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  delete: async (req, res, next) => {
    const idx = Number.parseInt(req.query.idx);

    try {
      const result = await CourseService.delete(idx);

      if (result === 0) {
        throw new Error("Not effected");
      }

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  //
  //
  //

  getDetail: async (req, res, next) => {
    try {
      const result = await CourseService.getDetail(req.query.idx);

      if (result.length === 0) {
        throw new Error("Empty set");
      }

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  getRecommend: async (req, res, next) => {
    try {
      const result = await CourseService.getRecommend();

      if (result.length === 0) {
        throw new Error("Empty set");
      }

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  //
  //
  //

  getUser: async (req, res, next) => {
    try {
      const result = await CourseService.getUser(req.query.idx);

      if (result.length === 0) {
        throw new Error("Empty set");
      }

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },
};

module.exports = CourseController;
