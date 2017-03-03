import Mongoose from 'mongoose';
import bluebird from 'bluebird';

Mongoose.Promise = bluebird;
const Schema = Mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TradeSchema = new Schema({
	mine: { type: ObjectId, required: true },
	theirs: { type: ObjectId, required: true },
	status: { type: String, default: "sent" },
	createdAt: { type: Date, default: Date.now }
});

export default Mongoose.model('Trade', TradeSchema);