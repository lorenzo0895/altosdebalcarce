const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { isActive } = require('../services/roles');
const bcrypt = require('bcryptjs');

router.get('/', isActive, async (req, res) => {
  const dni = req.session.dni;
  const user = await User.findOne({ dni: dni });
  res.render('perfil', { admin: req.session.admin, user: user });
});

router.post('/change-password', isActive, async (req, res) => {
  const { passwordActual, password1, password2, dni } = req.body;

  let user = await User.findOne({ dni: dni });
  const coinciden = await bcrypt.compare(passwordActual, user.password);
  if (!coinciden) {
    res.redirect('/perfil?msj=Contraseña actual incorrecta');
  }
  if (password1 != password2) {
    res.redirect('/perfil?msj=Las contraseñas no coinciden');
  }
  const encode = await bcrypt.hash(password1, 12);
  await User.findOneAndUpdate({ dni: dni }, { $set: { password: encode } });

  res.redirect('/perfil?msj=Contraseña cambiada correctamente');
});

module.exports = router;