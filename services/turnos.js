const Horarios = require('../models/Horarios');

module.exports.getTurnosFuturos = async function (seccion) {
  let now = new Date();
  let diasLimite = 2;
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
  for (let i = 0; i <= diasLimite; i++) {
    objetoHorarios[i] = [];
  }

  //----- GUARDAMOS OBJETOS EN objetoHorarios[i]. i VA A IR DESDE CERO HASTA diasLimite -----
  for (let i = 0; i <= diasLimite; i++) {
    let diaComparable = new Date();
    let brechaHoraria = diaComparable.getHours() - diaComparable.getUTCHours();
    diaComparable.setHours(diaComparable.getHours() + brechaHoraria);
    diaComparable.setDate(diaComparable.getDate() + i);
    diaComparableNumero = diaComparable.getDay() - 1;

    objeto[diaComparableNumero].forEach(el => {
      let horasLimiteHasta = el.hastaHoras;
      let minutosLimiteHasta = el.hastaMinutos;
      let horasLimiteDesde = el.desdeHoras;
      let minutosLimiteDesde = el.desdeMinutos;
      let hastaComparable = new Date();
      hastaComparable.setHours(brechaHoraria + horasLimiteHasta, minutosLimiteHasta, 0);
      let desdeComparable = new Date();
      desdeComparable.setHours(brechaHoraria + horasLimiteDesde, minutosLimiteDesde, 0);
      desdeComparable.setDate(desdeComparable.getUTCDate() + diasLimite);

      //FILTRAMOS HORARIOS QUE YA PASARON EL DÍA DE HOY
      if (i === 0) {
        if (hastaComparable >= diaComparable) {
          objetoHorarios[i].push(el);
        }
      } else if (i === diasLimite) {
        //FILTRAMOS HORARIOS DEL ÚLTIMO DÍA QUE EXCEDEN EL LÍMITE
        if (desdeComparable <= diaComparable) {
          objetoHorarios[i].push(el);
        }
      } else {
        objetoHorarios[i].push(el);
      }
    });
  }

  return objetoHorarios;


}