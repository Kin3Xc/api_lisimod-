// mongoose
var mongoose = require('mongoose');
var path = require('path');

// modelos Service, User y EmpDomicilarioModel
var Service = require('../models/service');
var User = mongoose.model('User');
var EmpDomiciliario = mongoose.model('EmpDomiciliarioModel');
var Usuario = require('../models/user');

var nodemailer = require('nodemailer');

// creo un objeto encargado de transportar el mensaje por medio del protocolo SMTP
// este objeto se crea una sol vez y se puede utulizar por los diferentes metodos de la app
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth:{
		user: 'elkinjuc@gmail.com',
		pass: 'rootshell'
	}
});


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

// retorna todos los servicios asociados a un usuario especifico
exports.findUserService = function(req, res){
	Service.find({ userId: req.params.id}, function(err, data){
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

	Usuario.findOne({_id: req.body.userId}, function(err, data){
		if (err) res.send(err);
		var usuario = data;

		// envio mail al usuario registrado
		// los datos de configuracion de correo con simbolo unicode
		var mailOptions = {
			from: 'Domisil Team <elkin@oglit.com>',
			to: usuario.email + ', danielr50@hotmail.com, kin3xc@hotmail.com', //FALTA DEFINIR
			subject: 'Nuevo servicio',
			text: 'Nuevo servicio',
			html: "<h1 style='color: #c0392b;'>Nuevo servicio en Domisil.co</h1> <p style='color:#7f8c8d;'>Su servicio se ha enviado correctamente, pronto nos pondremos en contacto con usted. <br><br><br> Cordialmente, <br>Team Domisil <br> Bogotá - Colombia <br> <a href='http://www.domisil.co'>Domisil.co</a></p>"
			// html: '<h1>Registro éxit Bogotá - Colombia <br>oso</h1> <p>Usted se registro en <a href="http://www.domisil.co" />Domisil.co</p>'
		};
	

		console.log(service);

		service.save(function(err, data){
			if(err) res.send(err);
			res.json({message: 'Agregaste un Servicio', data: data });

			// Envio el mail con el transportador definido
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					return console.log(error);
				}
				console.log('Mensaje enviado: ' + info.response);
			});

		});
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

