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
    type: Schema.Types.ObjectId
  },
  user: {
    type: Schema.Types.ObjectId
  }
});

const Reservas = mongoose.model('Reservas', schema);

module.exports = Reservas;