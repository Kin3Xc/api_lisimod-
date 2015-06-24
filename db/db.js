var mongoose = require('mongoose');
// llamo db mongo
exports.conectar = function(err, res){
	mongoose.connect('mongodb://localhost/domisildb');
	if (err) throw err;
	console.log('CONECTADO A DB');

} 

