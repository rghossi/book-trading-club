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
	const passwordHash = passwordHelper.hash(password, this.passwordSalt);

  if (passwordHash === this.password) {
  	return true;
  } else {
  	return false;
  }
};

UserSchema.statics.createNew = function createNew(user, cb) {
	const passwordHash = passwordHelper.hash(user.password);
	let NewUser = new this(user);
	NewUser.password = passwordHash;
  NewUser.save(cb);
};

export default Mongoose.model('User', UserSchema);