const mongoose = require("mongoose");
const app = require("../src/app");

// Cache global pour éviter de reconnecter Mongo à chaque requête (serverless)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async (req, res) => {
  try {
    // Swagger et ses assets ne doivent PAS dépendre de MongoDB
    const url = req.url || "";
    const isSwagger =
      url.startsWith("/api-docs") ||
      url.includes("swagger-ui") ||
      url.includes("swagger-ui-bundle") ||
      url.includes("swagger-ui-standalone") ||
      url.includes("swagger-ui-init");

    if (!isSwagger) {
      await connectDB();
    }

    return app(req, res);
  } catch (err) {
    console.error("DB connection error:", err.message);
    return res.status(500).json({ message: "Erreur connexion DB" });
  }
};
