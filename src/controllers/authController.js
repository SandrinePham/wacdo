const bcrypt = require("bcryptjs");
const User = require("../models/user");

// POST /api/users/register
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // validations simples
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username et password sont requis" });
    }

    // vérifier si username existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Nom d'utilisateur déjà utilisé" });
    }

    // hasher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // créer l'utilisateur
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || "ACCUEIL",
    });

    // grâce au toJSON dans le model, password est supprimé
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de l'enregistrement",
      error: error.message,
    });
  }
};

const jwt = require("jsonwebtoken");

// POST /api/users/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username et password sont requis" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la connexion",
      error: error.message,
    });
  }
};
