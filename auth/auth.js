// funciones controlador auth.js
var mongoose = require('mongoose');
// probar con mongoose.model('User'); CASA ADOLFO	
var User = require('../models/user');
//para crear el token uso este service
var service = require('../service/token');
var bcrypt = require('bcrypt');

var request = require('request');
var qs = require('querystring');
var config = require('../config');

//POR VER PUESTO DONDE ADOLFO
var jwt = require('jwt-simple');

exports.twitterLogin = function(req,res){
	res.send('hello');	
}


exports.faceAdentro = function(req, res){
	res.json('hola');
}


//function para registro con facebook
exports.faceLogin = function(req, res){
	var accessTokenUrl = 'https://graph.facebook.com/v2.3/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/v2.3/me';

	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: config.FACEBOOK_SECRET,
		redirect_uri: req.body.redirectUri
	};

	//Step 1 Exchange authorization code for access token
	// PROBAR SI CAMBIANDO accessToken por token CASA ADOLFO
	request.get({ url: accessTokenUrl, qs: params, json: true}, function(err, response, accessToken){
		if(response.statusCode !== 200){
			console.log('si es aca el problema');
			return res.status(500).send({ message: accessToken.error.message });
		}
	});

	//Step 2 Retrieve profile info about current user
	request.get({ url: graphApiUrl, qs: accessToken, json: true}, function(err, response, profile){
		if(response.statusCode !== 200){
			return res.status(500).send({ message: profile.error.message });
		}
		// si hay accessToken y envian headers de auth busca en db o crea
		if (req.headers.authorization){
			User.findOne({ facebook: profile.id}, function(err, existingUser){
				if(existingUser){
					return res.status(409).send({message: 'Ya existe una cuenta de facebook que te pertenece'});
				}
				// si no existe el user en facebook pero si hay authorization header crear token
				var token = req.headers.authorization.split(' ')[1];
				var payload = jwt.decode(token, config.TOKEN_SECRET);
				User.findById(payload.sub, function(err, user){
					if(!user){
						return res.status(400).send({ message: 'User not found'});
					}

					// si el user si es encontrado
					user.facebook = profile.id;
					user.picture = user.picture || 'http://graph.facebook.com/v2.3/'+profile.id+'/picture?type=large';
					user.displayName = user.displayName || profile.name;
					user.save(function(){
						var token = createJWT(user);
						// devuelvo el token
						res.send({ token: token});
					});
				});
			});
		} else {
			// Step 3b. Create new user account or return an existing one
			User.findOne({ facebook: profile.id}, function(err, existingUser){
				if(existingUser){
					var token = createJWT(existingUser);
					return res.send({ token: token });
				}
				var user = new User();
				user.facebook = profile.id;
				user.picture = 'https://graph.facebook.com/'+ profile.id + '/picture?type=large';
				user.displayName = profile.name;
				user.save(function(){
					var token = createJWT(user);
					res.send({ token: token});
				});
			});
		}
	});
} // fin faceLogin function




exports.unlinkProvider = function(req, res){
	var provider = req.params.provider;
	var providers = ['facebook'];

	if(provider.indexOf(providers) === -1){
		return res.status(400).send('Unknown Provider');
	}

	User.findById(req.user, function(err, user){
		if(!user){
			return res.status(400).send({message: 'User not found'});
		}
		user[provider] = undefined;
		user.save(function(){
			res.status(200).end();
		});
	});
}




// function para registro de usuario crea el token
exports.emailSignup = function(req, res){
	var user = new User({
		usuario: req.body.usuario
		// acá pongo el resto de parametros del modelo
	});

	bcrypt.hash(req.body.password, 10, function(err, hash){
		user.password = hash;
	
		user.save(function(err){
			if (err) { throw next(err) }
			return res
				.status(200)
				.send({ token: service.createToken(user)});
		});
	});
};



// prueba libro mean bcrypt - 
function validateUser(user, password, cb){	
		if(user === null) { return;} 
		bcrypt.compare(password, user.password, cb);
}

// function para ingresar usuario al sistema
exports.emailLogin = function(req, res){
	User.findOne({ usuario: req.body.usuario }, function(err, user){
		if (err) next(err);
		if(!user) res.json({success: false, message: 'No existe ese usuario'});
		// aqui viene comprobacion de contraseña bcrypt
		if (req.body.password === null) { return res.send(401)}
		if(req.body.password !== null){
			validateUser(user, req.body.password, function(err, valid){
				if(err || !valid){ return res.send(401)}
				// si no hay error y contraseña es igual devuelvo el token con payload
				console.log(user._id);
				return res
					.status(200)
					.send({ userId: user._id, token: service.createToken(user) });	
			});
		} else{
			return res.send({message:'llenar el formulario'});
		}	
	});
};

