import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controllers/userCtrl';
import * as BookController from './controllers/bookCtrl';

const router = new Router();

router.post("/users/new", UserController.createNew);
router.put('/users/:userId', UserController.loggedIn, UserController.updateUser);

router.get('/logout', UserController.loggedIn, UserController.logout);
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({user: req.user});
  }
);

router.get("/books", UserController.loggedIn, BookController.getAll);
router.post("/books/new", UserController.loggedIn, BookController.addBook);


export default router;