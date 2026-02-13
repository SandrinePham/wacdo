const Order = require("../models/order");

// GET /api/orders - récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // plus récentes d'abord
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur getAllOrders:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/orders/:id - récupérer une commande par ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// POST /api/orders - créer une commande
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de la commande",
      error: error.message,
    });
  }
};

// PUT /api/orders/:id - mettre à jour une commande (ex: status, items...)
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour",
      error: error.message,
    });
  }
};

// DELETE /api/orders/:id - supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// PATCH /api/orders/:id/prepared
exports.markPrepared = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "PREPARED" },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// PATCH /api/orders/:id/delivered
exports.markDelivered = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "DELIVERED" },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};
