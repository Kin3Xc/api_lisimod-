// ayuda a verificar que las rutas seas vistas por authenticated users

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

exports.ensureAuthenticated = function(req, res, next){
	// si no me mandan el token en el header
	if(!req.headers.authorization){
		return res
			.status(403)
			.send({ message: 'No tienes permiso: Tu petinición no me envío header con token (cabecera de autorización)'});
	}

	var token = req.headers.authorization.split(" ")[1];
	var payload = jwd.decode(token, config.TOKEN_SECRET);

	// reviso si token ya expiro respecto a fecha actual
	if(payload.exp <= moment().unix()){
		return res
			.status(401)
			.send({ message: "El token ha expirado"});
	}

	req.user = payload.sub;
	next();
}