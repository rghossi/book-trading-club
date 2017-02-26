import Mongoose from 'mongoose';
import bluebird from 'bluebird';

Mongoose.Promise = bluebird;
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, trim: true },
	createdAt: { type: Date, default: Date.now },
	email: { type: String, required: true, trim: true },
	password: { type: String, required: true, select: false },
	passwordSalt: { type: String, required: true, select: false }
});

export default Mongoose.model('User', UserSchema);