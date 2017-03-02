import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controllers/userCtrl';

const router = new Router();

router.post("/users/new", UserController.createNew);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({user: req.user});
  }
);
router.get('/logout', UserController.loggedIn, UserController.logout);

export default router;