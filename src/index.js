const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Serveur
app.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});
