'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken"),
  config = require('./api/helps/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jsonwebtoken.verify(req.headers.authorization, config.jwtSecret, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    res.send("Unauthorized user!");
    // next();
  }
});
var routes = require('./api/routes/todoListRoutes');
var userRoute = require('./api/routes/userRoutes');
routes(app);
userRoute(app);
// app.use(function(req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// });

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = app;