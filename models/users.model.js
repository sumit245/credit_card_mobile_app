const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const Users = new Schema({
  mobile_number: {
    type: String,
    required: [true, 'The todo text field is required'],
  },
  user_name: String,
  card_number: String,
  expiry: String,
  cvv: String,
  card_holder: String,
  email: String,
  points: String,
  limits: String,
  messages: Array,
  adhar: String,
  pan: String,
});

// Create model for todo
const User = mongoose.model('users', Users);

module.exports = User;
