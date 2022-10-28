const DivisionService = require("../services/division.service");

const DivisionController = {
  get: async (req, res, next) => {
    try {
      const result = await DivisionService.get(req.query.idx);

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

    try {
      const result = await DivisionService.create(data);

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

    try {
      const result = await DivisionService.update(idx, data);

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
      const result = await DivisionService.delete(idx);

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

module.exports = DivisionController;
