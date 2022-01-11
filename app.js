const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const mongoose = require('mongoose');
const connectMongoDB = require('connect-mongodb-session')(session);

//----- Vistas -----
app.set('view engine', 'ejs');
app.use(express.static('public'));

//----- Base de Datos -----
const uriDB = 'mongodb+srv://root:root@cluster0.ayfz2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uriDB)
  .then(console.log('Conectado a BD'))
  .catch('Error al conectarse a la BD');
const store = new connectMongoDB({
  uri: uriDB,
  collection: 'mySessions'
});

//----- Sesión -----
app.use(session({
  secret: 'secret-918273',
  resave: true,
  saveUninitialized: true,
  store: store
}))

//----- Config -----
app.use(express.urlencoded({extended:true}));

//----- Rutas -----
app.use('/', require(__dirname + '/routes/login'));
app.use('/', require(__dirname + '/routes/dashboard'));
app.use('/reserva', require(__dirname + '/routes/reserva'));
app.use('/mis-turnos', require(__dirname + '/routes/mis-turnos'));
app.use('/admin', require(__dirname + '/routes/admin'));
app.use('/perfil', require(__dirname + '/routes/perfil'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})