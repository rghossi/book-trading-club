import User from '../models/user';
import Book from '../models/book';

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