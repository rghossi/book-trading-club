import User from '../models/user';

export function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({message: "User not logged in!"});
    }
}

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

export function updateUser(req, res) {
	const userId = req.params.userId;
	const newUser = req.body.user;
	User.findById(userId, function(err, user) {
		if (err) res.status(400).send({message: err});
		else if(user) {
			if (newUser.name) user.name = newUser.name;
			if (newUser.email) user.email = newUser.email;
			if (newUser.city) user.city = newUser.city;
			if (newUser.state) user.state = newUser.state;
			user.save(function(err, updatedUser){
				if (err) throw err;
				else res.json(updatedUser);
			})
		}	else {
			res.status(500).send();
		}
	})
}

export function logout(req, res) {
  req.session.destroy(function (err) {
    res.send({message: "User has successfully logged out!"})
  });
}