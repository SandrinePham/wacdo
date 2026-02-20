const path = require("path");
const express = require("express");
const YAML = require("yamljs");
const swaggerUiDist = require("swagger-ui-dist");

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

module.exports = (app) => {
  // 1) Spec JSON (tu l’as déjà et ça marche)
  app.get("/swagger.json", (req, res) => {
    res.json(swaggerDocument);
  });

  // 2) Assets Swagger UI (JS/CSS) servis en statique
  const swaggerUiPath = swaggerUiDist.getAbsoluteFSPath();
  app.use("/api-docs", express.static(swaggerUiPath));

  // 3) Page HTML Swagger UI qui pointe vers /swagger.json
  app.get("/api-docs", (req, res) => {
    res.type("html").send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Wacdo API Docs</title>
  <link rel="stylesheet" href="/api-docs/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="/api-docs/swagger-ui-bundle.js"></script>
  <script src="/api-docs/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: "/swagger.json",
        dom_id: "#swagger-ui",
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>
    `);
  });

  // Support du slash final
  app.get("/api-docs/", (req, res) => res.redirect("/api-docs"));
};