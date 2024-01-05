const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  name: { type: String, validate: /^[A-Za-z\s]+$/ },
  email: { type: String, required: true, validate: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
  password: { type: String },
  phone: { type: String, validate: /^[0-9]+$/ },
  gender: { type: String, enum: ['male', 'female', 'others'] },
  source: [{ type: String, enum: ['linkedIn', 'friends', 'jobPortal', 'others'] }],
  city: { type: String },
  state: { type: String },
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
