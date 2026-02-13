const Menu = require("../models/menu");

// GET /api/menus - récupérer tous les menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    console.error("Erreur getAllMenus:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/menus/:id - récupérer un menu par ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// POST /api/menus - créer un menu
exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création du menu",
      error: error.message,
    });
  }
};

// PUT /api/menus/:id - mettre à jour un menu
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour",
      error: error.message,
    });
  }
};

// DELETE /api/menus/:id - supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: "Menu non trouvé" });
    }

    res.status(200).json({ message: "Menu supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};
