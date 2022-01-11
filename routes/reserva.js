const express = require('express');
const router = express.Router();
const {isActive} = require('../services/roles');
const turnos = require('../services/turnos');
const User = require('../models/User');
const Reservas = require('../models/Reservas');

router.get('/', isActive, async (req, res) => {
  var seccion = req.query.sec;
  let diferimiento = -3; //Diferimiento de la zona horaria de argentina con UTC
  let horarios = await turnos.getTurnosFuturos(seccion, diferimiento);
  let user = await User.findOne({dni : req.session.dni});
  res.render('reserva', {
    admin: req.session.admin, 
    horarios: horarios, 
    user: user,
    seccion: seccion,
    diferimiento: diferimiento
  });
});

router.post('/', isActive, async (req, res) => {
  const {turno, dia, user, seccion} = req.body;
  let date = new Date(dia);
  try {
    let reserva = new Reservas({
      turno: turno,
      dia: date,
      user: user,
      seccion: seccion
    });
    await reserva.save();
    res.redirect('/reserva?sec='+seccion+'&msj=Turno reservado correctamente. Si no vas a asistir, podés cancelarlo en la sección "Mis Turnos".');
  } catch (error) {
    res.redirect('/reserva?sec='+seccion+'&alert=Occurrió un error al solicitar turno');
  }
});

module.exports = router;