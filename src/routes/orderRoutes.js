const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  markPrepared,
  markDelivered,
} = require("../controllers/orderController");

// GET /api/orders
router.get("/", getAllOrders);

// GET /api/orders/:id
router.get("/:id", getOrderById);

// POST /api/orders
router.post("/", verifyToken, allowRoles("ACCUEIL", "ADMIN"), createOrder);

// PUT /api/orders/:id
router.put("/:id", updateOrder);

// DELETE /api/orders/:id
router.delete("/:id", deleteOrder);

// PREPARATION / ADMIN : marquer préparée
router.patch(
  "/:id/prepared",
  verifyToken,
  allowRoles("PREPARATION", "ADMIN"),
  markPrepared,
);

// ACCUEIL / ADMIN : marquer livrée
router.patch(
  "/:id/delivered",
  verifyToken,
  allowRoles("ACCUEIL", "ADMIN"),
  markDelivered,
);

module.exports = router;
