var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var empDomiciliarioSchema = new Schema([{
	nombreEmpresa: String, 
	tarifa: Number,
	domiciliarios: [{
		nombre: String,
		edad: String,
		foto: String
	}]
}]);

module.exports = mongoose.model('EmpDomiciliarioModel', empDomiciliarioSchema);