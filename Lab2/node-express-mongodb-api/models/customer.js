const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  addressType: {type: String, required: true}
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;