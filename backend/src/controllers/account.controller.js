const AccountService = require("../services/account.service");

const AccountController = {
  login: async (req, res, next) => {
    const id = req.body.ea;
    const pw = req.body.pk;

    try {
      const result = await AccountService.signin(id, pw);

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  // logout: (req, res, next) => {
  //   return res.status(200).json({
  //     result: true,
  //     msg: "Not effected",
  //   });
  // },

  updatePassword: async (req, res, next) => {
    const pw = req.body.pk;

    try {
      const result = await AccountService.updatePassword(req.user.idx, pw);

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },

  updateLevel: async (req, res, next) => {
    const level = req.body.level;

    try {
      const result = await AccountService.updateLevel(req.user.idx, level);

      return res.status(200).json({
        result,
        msg: "success",
      });
    } catch (err) {
      return res.status(400).json({
        result: false,
        msg: err.toString(),
      });
    }
  },
};

module.exports = AccountController;
