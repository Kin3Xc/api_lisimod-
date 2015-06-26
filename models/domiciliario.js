var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var domiciliarioSchema = new Schema({
	nombre: String, 
	email: String,
	telefono: Number,
	foto: String,
	numCedula: Number, 
	idEmpresa: {type: Schema.ObjectId, ref: 'EmpDomiciliarioModel'}
});

module.exports = mongoose.model('DomiciliarioModel', domiciliarioSchema);