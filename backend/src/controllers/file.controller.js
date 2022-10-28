const FileService = require("../services/file.service.js");

const FileController = {
  upload: async (req, res, next) => {
    try {
      let savePath = "";
      let dest = "";

      if (Object.keys(req.query).includes("loc")) {
        savePath = req.query.loc;
        dest += savePath + "/";
      }

      if (req.files === null) {
        return res.status(400).json({
          result: false,
          msg: "No file",
        });
      }

      const result = await FileService.upload(req.files.file, dest);

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

  delete: async (req, res, next) => {
    try {
      await FileService.delete(req.query.id);
    } catch (err) {
      return res.status(400).json({
        result: false,
        msg: err,
      });
    }

    return res.status(200).json({
      result: true,
      msg: "done",
    });
  },
};

module.exports = FileController;
