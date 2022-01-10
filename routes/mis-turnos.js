const express = require('express');
const router = express.Router();
const {isActive} = require('../services/roles');
const Reservas = require('../models/Reservas');
const User = require('../models/User');
const Horarios = require('../models/Horarios');

router.get('/', isActive, async (req, res) => {
  let user = await User.findOne({dni: req.session.dni});
  let reservas = await Reservas.find({user : user._id});
  let turnos = await Horarios.find({}).sort('dia').sort('seccion');
  res.render('mis-turnos', {admin: req.session.admin, reservas: reservas, turnos: turnos});
});

router.post('/borrar-turno', isActive, async (req, res) => {
  const {id} = req.body;
  console.log(id);
  await Reservas.findOneAndDelete({id: id});
  res.redirect('/mis-turnos');
});

module.exports = router;