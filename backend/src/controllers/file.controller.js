const FileService = require("../services/file.service.js");

const FileController = {
  download: async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      const streamDest = res;
      const header = req.headers["user-agent"];
      let isSigninSession = false;

      if (Object.keys(req.token).length === 0) {
        isSigninSession = false;
      } else {
        isSigninSession = true;
      }

      await FileService.download(uuid, header, streamDest, isSigninSession);

      return res.status(200);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  upload: async (req, res, next) => {
    try {
      // 비활성화
      // let savePath = ``;
      let paramStatus;

      // TODO: 추후 개선
      switch (req.params.flag) {
        case "classes":
          paramStatus = FileService.status.CLASSES;
          break;
        case "subjects":
          paramStatus = FileService.status.SUBJECTS;
          break;
        case "submit":
          paramStatus = FileService.status.SUBMIT;
          break;
        case "img":
          paramStatus = FileService.status.PUBLIC;
          break;
        default:
          throw new Error("unknown parameter");
      }

      let flagIdx = -1;
      if (paramStatus !== FileService.status.PUBLIC) {
        flagIdx = Number.parseInt(req.query.idx);
      }

      // 비활성화
      // if (Object.keys(req.query).includes("loc")) {
      //   savePath += req.query.loc;
      // }

      if (req.files === null) {
        throw new Error("No file");
      }

      const result = await FileService.upload(
        flagIdx,
        req.files.file,
        paramStatus
      );

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
      await FileService.delete(req.query.idx);
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
