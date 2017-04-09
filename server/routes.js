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
router.delete("/books/:bookId", UserController.loggedIn, BookController.deleteBook);
router.post("/books/new", UserController.loggedIn, BookController.addBook);
router.post("/books/trade", UserController.loggedIn, BookController.sendTradeRequest);

router.put("/trades/accept", UserController.loggedIn, BookController.acceptTradeRequest);
router.put("/trades/decline", UserController.loggedIn, BookController.declineTradeRequest);

export default router;