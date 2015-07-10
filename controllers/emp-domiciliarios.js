// ****** funciones que controllan rutas en routes/index.js

var mongoose = require('mongoose');
// para populate
var path = require('path');


// require los modelos de empresas y domiciliarios
var EmpDomiciliario = mongoose.model('EmpDomiciliarioModel');
var Domiciliario = mongoose.model('DomiciliarioModel');


// Busca una empresa de domiciliarios por su id
exports.findOneEmpDomiciliarios = function(req, res){
	EmpDomiciliario.find({ _id: req.params.id}, function(err, empDomiciliario){
		if (err) res.send(err);
		res.json(empDomiciliario);
	});
}

// Busca todas las empresas domiciliarios en db
exports.findAllEmpDomiciliarios = function(req, res){
	EmpDomiciliario.find(function(err, empDomiciliarios){
		res.json(empDomiciliarios);
	});
}

// Agrega una empresa Domiciliarios
exports.addEmpDomiciliario = function(req, res){
	
	// EN PRUEBA - upload img
	if(req.files.logoEmpresa){
		console.log('Cargando el archivo de la Imagen ...');
		var logoEmpresa = req.files.logoEmpresa.name;
	} else {
		// si no da foto poner foto default
		var logoEmpresa = "noimage.png";
	}

	var emp =  new EmpDomiciliario({
		// coger datos enviados por el formulario del cliente
		nombreEmpresa: req.body.nombreEmpresa,
		tarifaKm: req.body.tarifaKm,
		email: req.body.email,
		telefono: req.body.telefono,
		nitEmpresa: req.body.nitEmpresa,
		logoEmpresa: logoEmpresa

	});	
	// guardar datos en la db
	emp.save(function(err, data){
		if (err) res.send(err);
		res.json({message:"Se agrego correctamente", data: data});
	});

}

// Actualiza empresa domiciliarios
exports.updateEmpDomiciliario = function(req, res){
	EmpDomiciliario.findOne({ _id: req.params.id }, function(err, data){
		if (err) res.send(err);
		var empresa = data;
		empresa.nombreEmpresa = req.body.nombreEmpresa;
		empresa.tarifaKm = req.body.tarifaKm;
		empresa.email = req.body.email;
		empresa.telefono = req.body.telefono;
		empresa.nitEmpresa = req.body.nitEmpresa;
		empresa.logoEmpresa = req.body.logoEmpresa; 

		empresa.save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	}); 
		
}


// 
exports.updateDomiciliario = function(req, res){
	Domiciliario.findOne({ _id: req.params.id}, function(err, data){
		if (err) res.send(err);
		var domiciliario = data;
		domiciliario.nombre = req.body.nombre;
		domiciliario.email = req.body.email;
		domiciliario.telefono =  req.body.telefono;
		domiciliario.foto = req.body.foto;
		domiciliario.numCedula = req.body.numCedula;
		domiciliario.idEmpresa = req.body.idEmpresa;

		domiciliario.save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});
}



// Elimina una empresa Domiciliarios
exports.deleteEmpDomiciliario = function(req, res){
	EmpDomiciliario.find({ _id : req.params.id}).remove(function(err, log){
		if(err) res.send(err);
		res.send(log);
	});
}

// encuentra por tarifa 
exports.findByTarif = function(req, res){

}


// ---- DOMICILIARIOS

// agrega domiciliario
exports.addDomiciliario = function(req, res){
	if(req.files.foto){
		console.log('Cargando el archivo de la Imagen ...');
		var foto = req.files.foto.name;
	} else {
		// si no da foto poner foto default
		var foto = "noimage.png";
	}

	var domi = new Domiciliario({
		nombre: req.body.nombre,
		email: req.body.email,
		telefono: req.body.telefono,
		numCedula: req.body.numCedula,
		idEmpresa: req.body.idEmpresa,
		foto: foto
	});

	domi.save(function(err, data){
		if (err) res.send(err);
		res.json({message:"se agrego el domiciliario", data: data});
	});
}


// encuentra un domiciliario
exports.findOneDomiciliario = function(req, res){
	Domiciliario.find({ _id: req.params.id}, function(err, data){
		EmpDomiciliario.populate(data, { path: 'idEmpresa'}, function(err, data){
			if(err) res.send(err);
			res.json(data);
		});
		
	});	
}


// encuentra todos los domiciliarios
exports.findAllDomiciliarios = function(req, res){
	Domiciliario.find(function(err, domiciliario){
		if(err) res.send(err);	
		EmpDomiciliario.populate(domiciliario, {path: 'idEmpresa'}, function(err, domiciliario){
			if(err) res.send(err);
			res.json(domiciliario);
		});
		
	});
}

// Borra domiciliario
exports.deleteDomiciliario = function(req, res){
	Domiciliario.find({ _id: req.params.id }).remove(function(err, log){
		if(err) res.send(err);
		res.send(log);
	});
}

