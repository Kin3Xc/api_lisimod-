// funciones controlador auth.js
var mongoose = require('mongoose');
var User = require('../models/user');
//para crear el token uso este service
var service = require('../service/token');

// function para registro de usuario crea el token
exports.emailSignup = function(req, res){
	var user = new User({
		usuario: req.body.usuario,
		password: req.body.password
		// acá pongo el resto de parametros del modelo
	});

	user.save(function(err){
		return res
			.status(200)
			.send({ token: service.createToken(user)});
	});
};

// function para ingresar usuario
exports.emailLogin = function(req, res){
	User.findOne({ usuario: req.body.usuario }, function(err, user){
		if (err) next(err);
		if(!user) res.json({success: false, message: 'No existe ese usuario'});
		// aqui viene comprobacion de contraseña
		
		return res
			.status(200)
			.send({token: service.createToken(user)});
	});
};

