const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  diferenciaHoraria: {
    type: Number,
    required: true
  }
});

const Configs = mongoose.model('Configs', schema);

module.exports = Configs;