import Mongoose from 'mongoose';
import bluebird from 'bluebird';

Mongoose.Promise = bluebird;
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BookSchema = new Schema({
	name: { type: String, trim: true, required: true },
	createdAt: { type: Date, default: Date.now },
	author: { type: String, trim: true, required: true },
	isbn: { type: String, trim: true, required: true },
	owner: ObjectId,
	coverUrl: String
});

export default Mongoose.model('Book', BookSchema);