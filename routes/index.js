// rutas de toda la API acá

var express = require('express');
var router = express.Router();



var auth = require('../auth/auth');  
var middleware = require('../middleware/middleware');
var User = require('../models/user');


// requiere funciones de controladores
var domiciliarios = require('../controllers/emp-domiciliarios');
var users = require('../controllers/users');

// ruta home
router.get('/', function(req, res){
	res.send('hola bienvenido a la api de DOMISIL');
});

// EMP DOMICILIARIOS

// R - llamo una empresa domiciliario por id
router.get('/api/emp-domiciliarios/:id', domiciliarios.findOneEmpDomiciliarios);
// R - llamo todas las empresas de domiciliarios 
router.get('/api/emp-domiciliarios', domiciliarios.findAllEmpDomiciliarios);
// C - agregar una empresa de domiciliarios
router.post('/api/emp-domiciliarios', domiciliarios.addEmpDomiciliario);
// U - actualizar empresa de domiciliarios
router.put('/api/emp-domiciliarios/:id', domiciliarios.updateEmpDomiciliario);
// D - borrar una empresa de domiciliarios
router.delete('/api/emp-domiciliarios/:id', domiciliarios.deleteEmpDomiciliario);
// lógica de negocio
router.get('/api/tarifas', domiciliarios.findByTarif);


// DOMICILIARIOS
router.get('/api/domiciliarios', domiciliarios.findAllDomiciliarios);
router.post('/api/domiciliarios', domiciliarios.addDomiciliario);
router.get('/api/domiciliarios/:id', domiciliarios.findOneDomiciliario);
router.delete('/api/domiciliarios/:id', domiciliarios.deleteDomiciliario);
router.put('/api/domiciliarios/:id', domiciliarios.updateDomiciliario);


// Rutas auth y login
// Rutas de autenticación y login
router.post('/auth/signup', auth.emailSignup);  
router.post('/auth/login', auth.emailLogin);
router.post('/auth/facebook', auth.faceLogin);

router.get('auth/unlink/:provider', middleware.ensureAuthenticated, auth.unlinkProvider);



// EN DESARROLLO
// Ruta solo accesible si estás autenticado
router.get('/api/users', users.findAllUsers);
router.get('/api/users/:id', users.findOneUser);
router.put('/api/users/:id', users.updateUser);
router.delete('/api/users/:id', users.deleteUser);
router.post('/api/users', users.AddUser);

// middleware.ensureAuthenticated
router.get('/private', middleware.ensureAuthenticated, function(req, res) {
  res.json({message: "Esto es super secreto y solo lo dejo ver si lograron implementar el token"});
});


/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
router.get('/api/me', middleware.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
router.put('/api/me', middleware.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
});



module.exports = router;