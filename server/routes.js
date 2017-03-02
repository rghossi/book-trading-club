import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controllers/userCtrl';

const router = new Router();

router.post("/users/new", UserController.createNew);
router.put('/users/:userId', UserController.loggedIn, UserController.updateUser);

router.get('/logout', UserController.loggedIn, UserController.logout);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({user: req.user});
  }
);


export default router;