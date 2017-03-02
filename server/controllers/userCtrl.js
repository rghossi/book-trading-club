import User from '../models/user';

export function loggedIn(req, res, next) {
		console.log(req.user, req.session)
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

export function logout(req, res) {
  req.session.destroy(function (err) {
    res.send({message: "User has successfully logged out!"})
  });
}