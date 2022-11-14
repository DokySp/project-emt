const UserService = require("../services/user.service");

const UserController = {
  get: async (req, res, next) => {
    try {
      const result = await UserService.get(req.query.idx);

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
    delete data.issued_at;
    delete data.created;

    try {
      const result = await UserService.create(data);

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
    delete data.pw;
    delete data.email;
    delete data.issued_at;
    delete data.created;

    try {
      const result = await UserService.update(idx, data);

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
      const result = await UserService.delete(idx);

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

  //
  //
  //

  getCourses: async (req, res, next) => {
    try {
      // TODO: 임시코드
      let userIdx = 1; // token.user_idx

      const result = await UserService.getCourses(userIdx);

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

  createCourseUserLink: async (req, res, next) => {
    let courseIdx = Number.parseInt(req.query.idx);

    // TODO: 임시코드
    let userIdx = 1; // token.user_idx

    try {
      const result = await UserService.createCourseUserLink(userIdx, courseIdx);

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

  deleteCourseUserLink: async (req, res, next) => {
    let courseIdx = Number.parseInt(req.query.idx);

    // TODO: 임시코드
    let userIdx = 1; // token.user_idx

    try {
      const result = await UserService.deleteCourseUserLink(userIdx, courseIdx);

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
};

module.exports = UserController;
