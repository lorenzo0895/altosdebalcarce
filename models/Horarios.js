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
  desdeHoras: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  desdeMinutos: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  hastaHoras: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  hastaMinutos: {
    type: Number,
    required: true,
    min: 0,
    max: 59
  },
  cupo: {
    type: Number,
    required: true
  }
});

const Horarios = mongoose.model('Horarios', schema);

module.exports = Horarios;