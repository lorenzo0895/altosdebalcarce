const Horarios = require('../models/Horarios');
const Reservas = require('../models/Reservas');

function diaANumero(diaString) {
  switch (diaString) {
    case 'lunes':
      return 0;
    case 'martes':
      return 1;
    case 'miércoles':
      return 2;
    case 'jueves':
      return 3;
    case 'viernes':
      return 4;
    case 'sábado':
      return 5;
    case 'domingo':
      return 6;
    default:
      return 'Error';
  }
}

module.exports.getTurnosFuturos = async function (seccion, diferimiento) {
  //diferimiento es la configuración horaria (-3 para argentina)
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

  let totalReservas = await Reservas.find({ 'seccion': seccion });
  
  for (let i = 0; i <= diasLimite; i++) {
    let now = new Date();
    now.setHours(now.getHours() + diferimiento);
    now.setDate(now.getDate() + i);
    let dia = now.getDay();
    let horas = now.getHours();
    let minutos = now.getMinutes();

    objeto[dia].forEach(async element => {
      cantidadReservas = totalReservas.filter(elem => {

        let filtroHoy = (elem.dia.getFullYear() === now.getFullYear() &&
        elem.dia.getMonth() === now.getMonth() &&
        elem.dia.getDate() === now.getDate());
        let filtroTurno = (elem.turno.toString() === element._id.toString());
        return filtroTurno && filtroHoy;
      }).length;

      let el = Object.assign({}, element._doc);
      el.usados = cantidadReservas;

      if (i === 0) {
        if (el.hastaHoras > horas) {
          objetoHorarios[i].push(el);
        } else if (el.hastaHoras === horas && el.hastaMinutos >= minutos) {
          objetoHorarios[i].push(el);
        }
      } else if (i === diasLimite) {
        if (el.desdeHoras < horas) {
          objetoHorarios[i].push(el);
        } else if (el.desdeHoras === horas && el.desdeMinutos <= minutos) {
          objetoHorarios[i].push(el);
        }
      } else {
        objetoHorarios[i].push(el);
      }
    });
  }

  // console.log(objetoHorarios);
  return objetoHorarios;

}