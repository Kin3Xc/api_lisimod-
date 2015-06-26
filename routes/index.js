// rutas de toda la API acá
var express = require('express');
var router = express.Router();

// requiere funciones de controladores
var domiciliarios = require('../controllers/emp-domiciliarios');

// ruta home
router.get('/', function(req, res){
	res.send('hola');
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
module.exports = router;