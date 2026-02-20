const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

module.exports = (app) => {
  // 1) Exposer le spec en JSON (plus robuste en prod)
  app.get("/swagger.json", (req, res) => {
    res.json(swaggerDocument);
  });

  // 2) Servir les assets swagger-ui (JS/CSS)
  app.use("/api-docs", swaggerUi.serve);

  // 3) Servir la page Swagger UI en pointant vers /swagger.json
  const setup = swaggerUi.setup(null, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  });

  app.get("/api-docs", setup);
  app.get("/api-docs/", setup);
};