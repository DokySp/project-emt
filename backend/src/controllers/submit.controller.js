const SubmitService = require("../services/submit.service");

const SubmitController = {
  get: async (req, res, next) => {
    try {
      const result = await SubmitService.get(req.query.idx);

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

  getBySubject: async (req, res, next) => {
    try {
      let userIdx = req.token.idx;
      const result = await SubmitService.getBySubject(
        Number(req.query.idx),
        Number(userIdx)
      );

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

  getBySubjectAll: async (req, res, next) => {
    try {
      const result = await SubmitService.getBySubjectAll(Number(req.query.idx));

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
  //
  //

  create: async (req, res, next) => {
    let data = req.body;
    delete data.idx;

    try {
      const result = await SubmitService.create(data);

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
    delete data.course_idx;

    try {
      if (Object.keys(data).length === 0) {
        throw new Error("Not effected");
      }

      const result = await SubmitService.update(idx, data);

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
      const result = await SubmitService.delete(idx);

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

module.exports = SubmitController;
