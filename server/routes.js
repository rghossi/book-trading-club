import { Router } from 'express';
import Passport from 'passport';
import * as UserController from './controllers/userCtrl';

const router = new Router();

router.post("/users/new", UserController.createNew);

export default router;