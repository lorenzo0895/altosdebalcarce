const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { isActive } = require('../services/roles');
const bcrypt = require('bcryptjs');
const error = require('../services/error');

router.get('/', isActive, async (req, res) => {
  const dni = req.session.dni;
  const user = await User.findOne({ dni: dni });
  res.render('perfil', { admin: req.session.admin, user: user });
});

router.post('/change-password', isActive, async (req, res) => {
  const { passwordActual, password1, password2, dni } = req.body;
  let user = await User.findOne({ dni: dni });

  try {
    const coinciden = await bcrypt.compare(passwordActual, user.password);
    if (!coinciden) {
      throw new error.ExcepcionPropia('Contraseña actual incorrecta');
    }
    if (password1 != password2) {
      throw new error.ExcepcionPropia('Las contraseñas no coinciden');
    }
    const encode = await bcrypt.hash(password1, 12);
    await User.findOneAndUpdate({ dni: dni }, { $set: { password: encode } });
    res.redirect('/perfil?msj=Contraseña cambiada correctamente');
  } catch (error) {
    res.redirect('/perfil?alert=' + error.mensaje);
  }

});

module.exports = router;