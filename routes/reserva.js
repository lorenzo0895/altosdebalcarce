const express = require('express');
const router = express.Router();
const {isActive} = require('../services/roles');

router.get('/', isActive, (req, res) => {
  res.render('reserva', {admin: req.session.admin});
});

module.exports = router;