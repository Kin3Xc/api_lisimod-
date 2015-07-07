// para crear el token que va en ./auth.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');




// recibe user y genera un token con su id, y momento de creacion y expiracion
exports.createToken = function(user){
	var payload = {
		sub: user._id,
		// me da tiempo actual
		iat: moment().unix(),
		// me da tiempo a expirar al tiempo actual
		exp: moment().add(14, "days").unix()
	};
	// retorno token con el user que me pasaron
	return jwt.encode(payload, config.TOKEN_SECRET);
};

