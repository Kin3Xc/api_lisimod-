var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var domiciliarioSchema = new Schema({
	nombre: String, 
	identificacion: String,
	email: String,
	telefono: Number,
	foto: String,
	numCedula: Number, 
	estado: String,
	idEmpresa: {type: Schema.ObjectId, ref: 'EmpDomiciliarioModel'}
});

module.exports = mongoose.model('DomiciliarioModel', domiciliarioSchema);