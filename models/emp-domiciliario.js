var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var domiciliario = mongoose.model('DomiciliarioModel');

var empDomiciliarioSchema = new Schema({
	nombreEmpresa: String,
	tarifaKm: Number,
	email: String,
	telefono: Number,
	nitEmpresa: Number, 
	logoEmpresa: String
	
});

module.exports = mongoose.model('EmpDomiciliarioModel', empDomiciliarioSchema);