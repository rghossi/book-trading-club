import User from '../models/user';
import Book from '../models/book';
import Trade from '../models/trade';

export function addBook(req, res) {
	if (!req.body.book) res.status(400).send({message: "no book"});
	User.findById(req.user._id, function(err, user){
		if (err) throw err;
		if (!user) res.status(404).send({message: "User not found"});
		else {
			let newBook = new Book(req.body.book);
			newBook.owner = user._id;
			newBook.save((err, newBook) => {
				if (err) throw err;
				res.json({book: newBook});
			})
		}
	})
}

export function getAll(req, res) {
	Book.find({}, function(err, books){
		if (err) throw err;
		if (!books) res.status(404).send({message: "Books not found"});
		else {
			res.json({books});
		}
	})
}

export function sendTradeRequest(req, res) {
	Book.findById(req.body.mine, (err, book) => {
		if (err || !book) res.status(400).send({message: "First book not found!"});
		 Book.findById(req.body.theirs, (err2, book2) => {
			if (err2 || !book2) res.status(400).send({message: "Second book not found!"});
			let newTrade = new Trade(req.body);
			newTrade.save((err, trade) => {
				if (err) throw err;
				res.json({trade});
			})
		})
	})
}