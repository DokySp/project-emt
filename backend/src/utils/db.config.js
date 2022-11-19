// mysql 연동
var db = require("mysql2");

const secret = require("../../secret/secret");

let environment = "";
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "development-master"
) {
  environment = secret.development;
} else {
  environment = secret.production;
}

const dbConnection = {
  init: () => {
    return db.createConnection({
      host: environment.host,
      user: environment.username,
      password: environment.password,
      database: environment.database,
      dateStrings: true,
    });
  },
  open: (conn) => {
    conn.connect(function (err) {
      if (err) {
        console.error("DB connection failed.");
        console.error("Error Code: " + err.code);
        console.error("Error message : " + err.message);
      } else {
        console.log("DB connection successful.");
      }
    });
  },
  close: (conn) => {
    conn.end(function (err) {
      if (err) {
        console.error("DB Terminate failed.");
        console.error("Error Code: " + err.code);
        console.error("Error message : " + err.message);
      } else {
        console.log("DB Terminate connection");
      }
    });
  },
};

module.exports = dbConnection;
