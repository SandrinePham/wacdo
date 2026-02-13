const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER =", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN EXTRACTED =", token ? token.slice(0, 20) + "..." : token);

    if (!token) {
      return res.status(401).json({ message: "Format de token invalide" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT VERIFY ERROR =", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    next();
  };
};

