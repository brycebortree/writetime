var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var db = require('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'anditistoolate',
  resave: false,
  saveUninitialized: true
}));


app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/home.html'));
});

app.listen(3000);
