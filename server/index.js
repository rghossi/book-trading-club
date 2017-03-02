import path from 'path';
import { Server } from 'http';
import Express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from './models/user';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NotFoundPage from './components/NotFoundPage';
import Mongoose from 'mongoose';
import apiRoutes from './routes';
import BodyParser from 'body-parser';
// import * as UserCtrl from './controllers/user.controller';
import bluebird from 'bluebird';

Mongoose.Promise = bluebird;
const app = new Express();
const server = new Server(app);
const MONGODB_URI = process.env.database || 'mongodb://localhost/booktradingclub';
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Successfully connected to mongodb!")
})

Mongoose.connect(MONGODB_URI);

//Passport config
passport.use(new Strategy(
  function(email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(Express.static(path.join(__dirname, 'static')));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

export default app;