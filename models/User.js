const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  dni: {
    type: String,
    required: true,
    unique: true,
    min: 8,
    max: 8
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model('User', schema);

module.exports = User;