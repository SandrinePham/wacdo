const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

module.exports = (app) => {
  // IMPORTANT en serverless : serveFiles pour les assets (bundle.js, preset.js…)
  app.use(
    "/api-docs",
    swaggerUi.serveFiles(swaggerDocument),
    swaggerUi.setup(swaggerDocument)
  );
};
