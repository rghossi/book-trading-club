import path from 'path';
import { Server } from 'http';
import Express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NotFoundPage from './components/NotFoundPage';
import Mongoose from 'mongoose';
// import apiRoutes from './apiRoutes';
import BodyParser from 'body-parser';
// import Passport from 'passport';
// import * as UserCtrl from './controllers/user.controller';

const app = new Express();
const server = new Server(app);
const MONGODB_URI = process.env.database || 'mongodb://localhost/booktradingclub';
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Successfully connected to mongodb!")
})

Mongoose.connect(MONGODB_URI);

//TODO: use local passport strategy

// Passport.serializeUser(UserCtrl.serialize);
// Passport.deserializeUser(UserCtrl.deserialize);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(Express.static(path.join(__dirname, 'static')));
// app.use(BodyParser.json());
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(Passport.initialize());
// app.use(Passport.session());
// app.use('/api', apiRoutes);

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