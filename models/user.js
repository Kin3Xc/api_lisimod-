var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	// email: {type: String, unique: true, lowercase: true},
	nombre:String,
  email:String,
  telefono: String,
  usuario: {type: String, unique: true, lowercase: true},
  password: {type: String, select:false},
	// displayName: String,
	picture: String,
	facebook: String
});

//correr antes de .save()
UserSchema.pre('save', function(next) {
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

UserSchema.methods.comparePassword = function(password, done){
 bcrypt.compare(password, this.password, function(err, isMatch){
   done(err, isMatch);
 });
};




module.exports = mongoose.model('User', UserSchema);