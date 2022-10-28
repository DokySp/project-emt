const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const secret = require("./secret/secret");
const auth = require("./src/utils/auth");
const { swaggerUi, specs } = require("./src/utils/swagger");
const crypt = require("./src/utils/crypt");
const rp = require("./src/utils/routingPath");

// 프로젝트 환경변수 설정
require("dotenv").config();

process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == "production"
    ? "production"
    : process.env.NODE_ENV.trim().toLowerCase() == "production-master"
    ? "production-master"
    : process.env.NODE_ENV.trim().toLowerCase() == "development-master"
    ? "development-master"
    : "development";
console.log(`Emt Server runs in ${process.env.NODE_ENV.toUpperCase()} mode`);

// Express 호출
var app = express();
app.use(logger(process.env.NODE_ENV)); // app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(crypt.init);
app.use(fileUpload());

// CORS
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "development-master"
) {
  const cors = require("cors");
  app.use(cors());
  console.log(`CORS option is on`);
}

// Routing 코드 호출 & 미들웨어 바인딩
for (let i of Object.values(rp)) {
  if (i.url == rp.apiPrefix.url) continue;
  app.use(`${rp.apiPrefix.url}${i.url}`, require(i.route));
}

// Swagger setting
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
