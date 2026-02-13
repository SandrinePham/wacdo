const express = require("express");
const router = express.Router();

const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// GET /api/menus
router.get("/", getAllMenus);

// GET /api/menus/:id
router.get("/:id", getMenuById);

// POST /api/menus
router.post("/", createMenu);

// PUT /api/menus/:id
router.put("/:id", updateMenu);

// DELETE /api/menus/:id
router.delete("/:id", deleteMenu);

module.exports = router;
