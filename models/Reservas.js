const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  seccion: {
    type: String,
    required: true
  },
  dia: {
    type: Date,
    required: true
  },
  turno: {
    type: Schema.Types.ObjectId,
    ref: 'Horarios'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Reservas = mongoose.model('Reservas', schema);

module.exports = Reservas;