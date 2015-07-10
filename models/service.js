// aca va modelo servicio

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema ({
	userId: {type: Schema.ObjectId, ref: 'User'},
	tipoDePago: String,
	valorPedido: Number,
	idEmpresa: {type: Schema.ObjectId, ref: 'EmpDomiciliarioModel'},
	estadoService: String,
	dirOrigen: String,
	dirDestino: String
});

module.exports = mongoose.model('Service', ServiceSchema);

// EL MODELO Servie LLEVA LOS SIGUIENTES DATOS DEL PEDIDO
// userId = id del usuario que generó el pedido
// tipoDePago = lleva la forma de pago (pago al enviar o con la entrega)
// valorPedido = cuanto debe cancelar el user por el pedido
// estadoService = estado del servicio (enProceso, esperandoConfirmacion, asignado, terminado)
// dirOrigen = direccion de inicio del servicio
// dirDestino = dirreccion de entrega del servicio

