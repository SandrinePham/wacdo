const path = require("path");
const YAML = require("yamljs");

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

module.exports = (app) => {
  // Exposer le spec (tu l'as déjà, on garde)
  app.get("/swagger.json", (req, res) => {
    res.json(swaggerDocument);
  });

  // Swagger UI via CDN (aucun asset statique à servir côté Vercel)
  app.get("/api-docs", (req, res) => {
    res.type("html").send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Wacdo API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
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

  // support du slash final
  app.get("/api-docs/", (req, res) => res.redirect("/api-docs"));
};