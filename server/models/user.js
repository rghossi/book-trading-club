import Mongoose from 'mongoose';
import bluebird from 'bluebird';
import * as passwordHelper from '../helpers/password';

Mongoose.Promise = bluebird;
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, trim: true },
	createdAt: { type: Date, default: Date.now },
	email: { type: String, required: true, trim: true },
	password: { type: String, required: true, select: false },
	passwordSalt: { type: String, required: true, select: false }
});

UserSchema.methods.verifyPassword = function verifyPassword(password) {
	passwordHelper.hash(password, this.passwordSalt, (err, hash) => {
		if (err) throw err;
		if (hash === this.password) {
	  	return true;
	  } else {
	  	return false;
	  }
	});
};

UserSchema.statics.createNew = function createNew(user, cb) {
	passwordHelper.hash(user.password, (err, hash, salt) => {
		if (err) throw err;
		let NewUser = new this(user);
		NewUser.password = hash;
		NewUser.passwordSalt = salt;
	  NewUser.save(cb);
	});
};

export default Mongoose.model('User', UserSchema);