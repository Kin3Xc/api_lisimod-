// aqui van todas las funciones relacionadas con routes/index
var mongoose = require('mongoose');
// var Emp-domiciliario = mongoose.model('Emp-domiciliario');

// Busca una empresa de domiciliarios por su id
exports.findOneEmpDomiciliarios = function(req, res){

}

// Busca todas las empresas domiciliarios en db
exports.findAllEmpDomiciliarios = function(req, res){
	var obj = {"nombre": "Daniel",
		"Domiciliarios" : {
			"name": "Pedro"
		}
	};
	res.json(obj);
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
