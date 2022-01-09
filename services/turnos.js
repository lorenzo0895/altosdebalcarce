const Horarios = require('../models/Horarios');

module.exports.getTurnosFuturos = async function (seccion) {
  let now = new Date();
  let diasLimite = 3;
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
  let objetoHorarios = {};
  for (let i = 0; i < diasLimite; i++) {
    objetoHorarios[i] = [];
  }

  //----- GUARDAMOS OBJETOS EN objetoHorarios[i]. i VA A IR DESDE CERO HASTA diasLimite-1 -----
  for (let i = 0; i < diasLimite; i++) {
    let diaComparable = new Date();
    diaComparable.setDate(diaComparable.getDate() - 1 + i);
    diaComparable = diaComparable.getDay();

    objeto[diaComparable].forEach(el => {
      objetoHorarios[i].push(el);
    });
  }

  return objetoHorarios;

  
}