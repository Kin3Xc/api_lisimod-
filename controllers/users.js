// ****** funciones que controllan rutas de users en routes/index.js

var mongoose = require('mongoose');
var path = require('path');

// require los modelos de users, empresas, y domiciliarios
var User = mongoose.model('User');
var EmpDomiciliario = mongoose.model('EmpDomiciliarioModel');
var Domiciliario = mongoose.model('DomiciliarioModel');

// funciones para rutas

//lista controladoras de todos los users
exports.findAllUsers = function(req, res){
	User.find({}, function(err, users){
		if (err) next(err);
		res.json(users);
	});
};


exports.findOneUser = function(req, res){
	User.find({ _id: req.params.id }, function(err, user){
		if(err) next(err);
		res.json(user);
	});
};


// actualizar email
exports.updateEmail = function(req, res){
	// console.log('Aqui voy');
	User.findOne({ _id: req.params.id }, function(err, user){
		if (err) res.send({message: 'Error'})
		user.email = req.body.email;

		console.log(req.body.email);

		user.save(function(err, data){
			if (err) res.send({message: 'Error al actualizar el correo electronico'});
			res.json({message:"se Actualizo el email", data: data});
		});
	});
};

exports.updateUser = function(req, res){
	User.findOne({ _id: req.params.id }, function(err, user){
		if (err) next(err);
		// var us = user;
		user.nombre = req.body.nombre;
		user.email = req.body.email;
		user.telefono = req.body.telefono;
		user.usuario = req.body.usuario;
		// user.password = req.body.password;
		console.log('USUARIO: '+ req.body.password);

		// verifico si el pwd viene vacio
		if (req.body.password != undefined) {
			user.password = req.body.password;
		}

		user.save(function(err, data){
			if (err) res.send({message: 'Error al almacenar los datos'});
			res.json({message:"se Actualizo el usuario", data: data});
		});
	});
};

exports.deleteUser = function(req, res){
	User.find({ _id: req.params.id }).remove(function(err, log){
		if(err) next(err);
		res.send(log);
	});
};


//para nosotros agregar 
exports.AddUser = function(req, res){
	var user = new User({
		nombre: req.body.nombre,
		email:req.body.email,
		telefono:req.body.telefono,
		usuario: req.body.usuario,
		password: req.body.password
	});

	user.save(function(err, data){
		if(err) next(err);
		res.json({message:"agregaste usuario", data: data});
	})
}

