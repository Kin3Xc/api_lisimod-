var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var domiciliario = mongoose.model('DomiciliarioModel');
var bcrypt = require('bcrypt');

var empDomiciliarioSchema = new Schema({
	usuario: { type: String, required: true, index: { unique: true } },
	password: String,
	nombreEmpresa: String,
	tarifaKm: Number,
	email: String,
	telefono: Number,
	nitEmpresa: String, 
	logoEmpresa: String
	
});

//correr antes de .save()
empDomiciliarioSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });

});

empDomiciliarioSchema.methods.comparePassword = function(password, done){
 bcrypt.compare(password, this.password, function(err, isMatch){
   // done(err, isMatch);
  if (err) return done(err);
  done(null, isMatch);
 });
};

module.exports = mongoose.model('EmpDomiciliarioModel', empDomiciliarioSchema);