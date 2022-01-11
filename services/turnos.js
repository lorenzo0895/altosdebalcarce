const Horarios = require('../models/Horarios');

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

  for (let i = 0; i <= diasLimite; i++) {
    let now = new Date();
    now.setHours(now.getHours() + diferimiento);
    now.setDate(now.getDate() + i);
    let dia = diaANumero(now.toLocaleString('es-AR', { weekday: 'long' }));
    let horas = Number(now.toLocaleString('es-AR', { hour: 'numeric' }));
    let minutos = Number(now.toLocaleString('es-AR', { minute: 'numeric' }));
    objeto[dia].forEach(el => {
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
  return objetoHorarios;

}