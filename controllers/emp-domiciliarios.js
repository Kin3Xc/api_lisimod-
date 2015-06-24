// aqui van todas las funciones relacionadas con routes/index
var mongoose = require('mongoose');
var EmpDomiciliario = mongoose.model('EmpDomiciliarioModel');

// Busca una empresa de domiciliarios por su id
exports.findOneEmpDomiciliarios = function(req, res){

}

// Busca todas las empresas domiciliarios en db
exports.findAllEmpDomiciliarios = function(req, res){
EmpDomiciliario.find(function(err, empDomiciliarios){
	res.json(empDomiciliarios);
});
	

}

// Agrega una empresa Domiciliarios
exports.addEmpDomiciliario = function(req, res){

}

// Actualiza empresa domiciliarios
exports.updateEmpDomiciliario = function(req, res){

}

// Elimina una empresa Domiciliarios
exports.deleteEmpDomiciliario = function(req, res){

}

exports.findByTarif = function(req, res){

}
