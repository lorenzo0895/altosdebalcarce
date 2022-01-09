const User = require('../models/User');

const isActive = async (req, res, next) => {
  const dni = req.session.dni;
  const user = await User.findOne({dni : dni});
  if (user != null && user.active) {
    next()
  } else {
    res.redirect('/logout');
  }
}
const isAdmin = async (req, res, next) => {
  const dni = req.session.dni;
  const user = await User.findOne({dni : dni});
  if (user != null && user.admin) {
    next()
  } else {
    res.redirect('/');
  }
}
module.exports = {isActive, isAdmin};