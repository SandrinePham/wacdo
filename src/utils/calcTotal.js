// Calcule le total en centimes à partir d'items (quantity + unitPriceCents)
module.exports = function calcTotal(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPriceCents) || 0;
    return sum + qty * price;
  }, 0);
};
