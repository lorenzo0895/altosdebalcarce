const Horarios = require('../models/Horarios');

module.exports.getTurnosFuturos = async function (seccion) {
  let now = new Date();
  let horas = await Horarios.find({ seccion: seccion }).sort('dia').sort('desdeHoras').sort('desdeMinutos');
  let objeto = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

  horas.forEach(el => {
    objeto[el.dia].push(el);
  });

}