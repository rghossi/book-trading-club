import User from '../models/user';

export function createNew(req, res) {
	const user = req.body.user;
	User.createNew(user, function(err, newUser) {
		if (err) res.status(400).send({message: err});
		else if(newUser) {
			newUser.password = undefined;
			newUser.passwordSalt = undefined;
			res.json(newUser);
		}	else {
			res.status(500).send();
		}
	})
}