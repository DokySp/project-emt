const UserService = require("../services/user.service");

const UserController = {
  getUser: async (req, res, next) => {
    try {
      const result = await UserService.getUser(req.query.idx);

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

  createUser: async (req, res, next) => {
    let courseData = req.body;
    delete courseData.idx;

    try {
      const result = await UserService.createUser(courseData);

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

  updateUser: async (req, res, next) => {
    const courseData = req.body;
    const idx = Number.parseInt(req.query.idx);
    delete courseData.idx;

    try {
      const result = await UserService.updateUser(idx, courseData);

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

  deleteUser: async (req, res, next) => {
    const idx = Number.parseInt(req.query.idx);

    try {
      const result = await UserService.deleteUser(idx);

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

  createCourseUserLink: async (req, res, next) => {
    let courseData = req.body;
    delete courseData.idx;

    try {
      const result = await UserService.createUser(courseData);

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
    const idx = Number.parseInt(req.query.idx);

    try {
      const result = await UserService.deleteUser(idx);

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
