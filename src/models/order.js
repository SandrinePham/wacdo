const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    // Une ligne correspond soit à un productId soit à un menuId (XOR)
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null },

    quantity: { type: Number, required: true, min: 1 },

    // Prix figé au moment de la commande (pratique pour éviter les incohérences si le prix change)
    unitPriceCents: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true, trim: true },

    status: {
      type: String,
      enum: ["CREATED", "PREPARED", "DELIVERED", "CANCELLED"],
      default: "CREATED",
    },

    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "Une commande doit contenir au moins un item",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
