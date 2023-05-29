const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middlewares/errHandler");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API With Swagger",
      version: "0.1.0",
      description: "API application Express And Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "access_token",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(errorHandler);

module.exports = app;
