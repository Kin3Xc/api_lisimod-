var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	password: {type:String, select: false},
	usuario: String,
	displayName: String,
	picture: String,
	facebook: String
});

// correr antes de .save()
UserSchema.pre('save', function(next){
	var user = this;
	// break if password no ha sido cambiado
	if(!user.isModified('password')) {
		return next();
	}

	// pasword cambio entonces toca hashearlo
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(user.password, salt, function(err, hash){
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