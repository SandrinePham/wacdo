const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());

// Connexion MongoDB
mongoose
  .connect("mongodb+srv://sandrinepham89_db_user:QcfKmOnbFykQ7V3S@profil1.qt4zib6.mongodb.net/?appName=Profil1")
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Route test
app.get("/", (req, res) => {
  res.send("Bonjour !");
});

// Serveur
app.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});
