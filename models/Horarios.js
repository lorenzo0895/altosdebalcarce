const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  seccion: {
    type: String,
    required: true
  },
  dia: {
    type: Number,
    required: true
  },
  desde: {
    type: Date,
    required: true
  },
  hasta: {
    type: Date,
    required: true
  },
  cupo: {
    type: Number,
    required: true
  }
});

const Horarios = mongoose.model('Horarios', schema);

module.exports = Horarios;