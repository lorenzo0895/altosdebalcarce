const express = require('express');
const router = express.Router();
const {isActive} = require('../services/roles');
const Reservas = require('../models/Reservas');
const User = require('../models/User');
const Horarios = require('../models/Horarios');
const Configs = require('../models/Configs');

router.get('/', isActive, async (req, res) => {
  let user = await User.findOne({dni: req.session.dni});
  let turnos = await Horarios.find({}).sort('dia').sort('seccion');
  let configs = await Configs.find({}).exec();
  let diferenciaHoraria = configs[0].diferenciaHoraria;
  let hoy = new Date();
  hoy.setHours(hoy.getHours() + diferenciaHoraria);
  let reservas = await Reservas.find({
    'user': {'_id': user._id},
    'dia': {$gte: [ "$dia", hoy ]}
  }).sort('dia');
  res.render('mis-turnos', {
    admin: req.session.admin,
    reservas: reservas,
    turnos: turnos,
  });
});

router.post('/borrar-turno', isActive, async (req, res) => {
  const {id} = req.body;
  await Reservas.findOneAndDelete({id: id});
  res.redirect('/mis-turnos');
});

module.exports = router;