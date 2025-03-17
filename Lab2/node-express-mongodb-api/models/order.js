const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  items: [{ itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, name: String, quantity: Number }],
  status: { type: String, enum: ["Pending", "Cancelled", "Completed"], default: "Pending" },
  totalPrice: { type: Number }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;