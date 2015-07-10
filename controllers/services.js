// mongoose
var mongoose = require('mongoose');
var path = require('path');

// modelos Service, User y EmpDomicilarioModel
var Service = require('../models/service');
var User = mongoose.model('User');
var EmpDomiciliario = mongoose.model('EmpDomiciliarioModel');


//R*
exports.findAllServices = function(req, res){
	//falta popular userId y idEmpresa
	Service.find({}, function(err, services){
		if (err) next(err);
		res.json(services);
	});
}

//R1
exports.findOneService = function(req, res){
 Service.findOne({ _id: req.params.id}, function(err, data){
 	User.populate(data, { path: 'userId'}, function(err, data){
 		if(err) next(err);
	 	EmpDomiciliario.populate(data, { path: 'idEmpresa'}, function(err, data){
	 		if (err) next(err);
		 	res.json(data);
	 	});
 	});
	 	
 });
}

//C
exports.addOneService = function(req, res){
	var service = new Service({
		userId: req.body.userId,
		tipoDePago: req.body.tipoDePago,
		valorPedido: req.body.valorPedido,
		idEmpresa: req.body.idEmpresa,
		estadoService: req.body.estadoService,
		dirOrigen: req.body.dirOrigen,
		dirDestino: req.body.dirDestino
	});

	console.log(service);

	service.save(function(err, data){
		if(err) res.send(err);
		res.json({message: 'Agregaste un Servicio', data: data });
	});
}

//U
exports.updateService = function(req, res){
	Service.findOne({ _id: req.params.id}, function(err, data){
	if (err) res.send(err);
 	var servicio = data;

 	//modificaciones
 	servicio.tipoDePago = req.body.tipoDePago;
 	
 	servicio.save(function(err, data){
 		if (err) throw err;
 		res.json(data);
 	});
 });
}

//D 
exports.deleteService = function(req, res){
	Service.findOne({ _id: req.params.id}).remove(function(err, log){
		if (err) next(err);
		res.send(log);
	});
}

