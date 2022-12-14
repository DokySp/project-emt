const crypto = require("crypto");
const util = require("util");
const bcrypt = require("bcrypt");
const secret = require("../../secret/secret");

let salt = "";
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const crypt = {
  init: async (req, res, next) => {
    const buf = await randomBytesPromise(64);
    salt = buf.toString("base64");
    next();
  },

  // pbkdf2
  // createPassword: async (pw) => {
  //   const key = await pbkdf2Promise(
  //     pw,
  //     salt,
  //     secret.pbkdf2.arg11,
  //     secret.pbkdf2.arg12,
  //     secret.pbkdf2.arg13
  //   );
  //   const hashedPassword = key.toString("base64");

  //   return hashedPassword;
  // },

  // verifyPassword: async (input, hashedPw) => {
  //   const key = await pbkdf2Promise(
  //     input,
  //     salt,
  //     secret.pbkdf2.arg11,
  //     secret.pbkdf2.arg12,
  //     secret.pbkdf2.arg13
  //   );
  //   const result = key.toString("base64");

  //   if (result === hashedPw) return true;
  //   return false;
  // },

  //
  //
  //

  // bcrypt
  createPassword: (pw) => {
    return bcrypt.hashSync(pw, secret.bcrypt.round);
  },

  verifyPassword: (input, hashedPw) => {
    return bcrypt.compareSync(input, hashedPw);
  },
};

module.exports = crypt;
