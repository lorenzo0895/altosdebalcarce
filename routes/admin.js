const express = require('express');
const router = express.Router();
const { isAdmin } = require('../services/roles');
const User = require('../models/User');
const Horarios = require('../models/Horarios');
const bcrypt = require('bcryptjs');

router.get('/', isAdmin, (req, res) => {
  res.render('admin-home', { admin: req.session.admin });
});

router.get('/new-user', isAdmin, (req, res) => {
  res.render('admin-usuario-alta', { admin: req.session.admin });
});

router.get('/user-list', isAdmin, async (req, res) => {
  const users = await User.find({}).sort('dni');
  res.render('admin-usuario-lista', { admin: req.session.admin, users: users });
});

router.get('/schedule', isAdmin, async (req, res) => {
  let horMusc = await Horarios.find({seccion : 'musculacion'});
  let horPil = await Horarios.find({seccion : 'pilates'});
  res.render('admin-turnos-schedule', {
    admin: req.session.admin,
    horMusc: horMusc,
    horPil: horPil
  });
});

router.get('/user/:dni', isAdmin, async (req, res) => {
  const user = await User.findOne({ dni: req.params.dni });
  res.render('admin-usuario-modificar', { admin: req.session.admin, user: user });
});

router.post('/new-user', isAdmin, async (req, res) => {
  let { name, surname, dni, admin, active } = req.body;
  active = (active == "on") ? true : false;
  admin = (admin == "on") ? true : false;
  let user = await User.findOne({ dni });

  if (user) {
    return res.redirect('/admin/new-user?alert=Ya existe un usuario con el DNI indicado');
  }
  try {
    const encode = await bcrypt.hash(dni, 12);
    user = new User({
      dni: dni,
      name: name,
      surname: surname,
      password: encode,
      admin: admin,
      active: active
    });
    await user.save();
  } catch (error) {
    return res.redirect('/admin/new-user?alert=Ocurrió un error al crear el usuario');
  }

  res.redirect('/admin/new-user?msj=Usuario agregado');
});

router.post('/user/:dni/editar-datos', isAdmin, async (req, res) => {
  let { name, surname, dni, dniActual, admin, active } = req.body;
  active = (active == "on") ? true : false;
  admin = (admin == "on") ? true : false;
  await User.findOneAndUpdate({ dni: dniActual },
    {
      $set: {
        dni: dni,
        name: name,
        surname: surname,
        active: active,
        admin: admin
      }
    });
  res.redirect('/admin/user/' + dni);
});

router.post('/user/:dni/editar-password', isAdmin, async (req, res) => {
  const { password1, password2, dni } = req.body;

  if (password1 != password2) {
    res.redirect('/admin/user/' + dni + '?msj=Las contraseñas no coinciden');
  }
  const encode = await bcrypt.hash(password1, 12);
  await User.findOneAndUpdate({ dni: dni }, { $set: { password: encode } });

  res.redirect('/admin/user/' + dni + '?msj=Contraseña cambiada correctamente');
});

router.post('/schedule/musculacion', isAdmin, async (req, res) => {
  const {
    desdelunes, hastalunes, cupolunes,
    desdemartes, hastamartes, cupomartes,
    desdemiercoles, hastamiercoles, cupomiercoles,
    desdejueves, hastajueves, cupojueves,
    desdeviernes, hastaviernes, cupoviernes,
    desdesabado, hastasabado, cuposabado,
    desdedomingo, hastadomingo, cupodomingo
  } = req.body;

  //Falta borrar los turnos viejos

  try {
    agregarHorario(desdelunes, hastalunes, cupolunes, 0, 'musculacion');
    agregarHorario(desdemartes, hastamartes, cupomartes, 1, 'musculacion');
    agregarHorario(desdemiercoles, hastamiercoles, cupomiercoles, 2, 'musculacion');
    agregarHorario(desdejueves, hastajueves, cupojueves, 3, 'musculacion');
    agregarHorario(desdeviernes, hastaviernes, cupoviernes, 4, 'musculacion');
    agregarHorario(desdesabado, hastasabado, cuposabado, 5, 'musculacion');
    agregarHorario(desdedomingo, hastadomingo, cupodomingo, 6, 'musculacion');

  } catch (error) {
    return res.redirect('/admin/schedule?alerta=Hubo un error al editar los horarios');
  }

  res.redirect('/admin/schedule');
});

function stringToDate(string) {
  let horas = Number(string.substring(0, 2));
  let minutos = Number(string.substring(3, 5));
  let minutosTotales = minutos + horas * 60;
  let date = new Date(0);
  date.setMinutes(date.getMinutes() + minutosTotales);
  return date;
}

async function agregarHorario(desde, hasta, cupo, dia, seccion) {
  if (Array.isArray(desde)) {
    desde.forEach(async (el, i) => {
      let desde2 = stringToDate(desde[i]);
      let hasta2 = stringToDate(hasta[i]);

      let horario = new Horarios({
        seccion: seccion,
        dia: dia,
        desde: desde2,
        hasta: hasta2,
        cupo: cupo[i]
      });
      await horario.save();
    })
  } else if (desde != undefined) {
    let desde2 = stringToDate(desde);
    let hasta2 = stringToDate(hasta);

    let horario = new Horarios({
      seccion: seccion,
      dia: dia,
      desde: desde2,
      hasta: hasta2,
      cupo: cupo
    });
    await horario.save();
  } else {
    //No hacemos nada
  }
}

module.exports = router;