const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
  const dni = req.body.dni;
  if (dni != null) {
    res.redirect('/');
  }
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { dni, password } = req.body;

  try {
    const user = await User.findOne({ dni: dni });
    if (!user) {
      res.redirect('/login?alert=El usuario no existe.');
    } else {
      const coinciden = await bcrypt.compare(password, user.password);
      if (!coinciden) {
        res.redirect('/login?alert=La contraseña es incorrecta.');
      } else {
        req.session.dni = user.dni;
        req.session.admin = user.admin;
        res.redirect('/');
      }
    }
  } catch (error) {
    res.redirect('/login');
  }

});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
  });
  res.redirect('/login');
});

module.exports = router;