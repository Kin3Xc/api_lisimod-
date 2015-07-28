var mongoose = require('mongoose');
// llamo db mongo
exports.conectar = function(err, res){
	// mongoose.connect('mongodb://localhost/domisildb');// LOCAL
	mongoose.connect('mongodb://<domisil>:<domisil123_$#>@ds037617.mongolab.com:37617/domisilapp');// REMOTYE

	if (err) throw err;
	console.log('CONECTADO A LA BASE DE DATOS DE MONGODB');
} 

mongodb://<dbuser>:<dbpassword>@ds037617.mongolab.com:37617/domisilapp