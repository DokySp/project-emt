const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "0.1.0",
      title: "[KAVE] Project Emt",
      desciption: "KAVE Emt 프로젝트 / 2022.10.05",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local test server" },
      { url: "http://185.199.111.153:3000", description: "Production" },
      { url: "https://185.199.111.153:3000", description: "Production (SSL)" },
    ],
  },
  apis: ["./src/routes/*.js", "./src/utils/swagger.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Auth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
