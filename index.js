var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var db = require('./models');
var models = require('./models');

var secret = "behindtheuniverse";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/recipes', expressJWT({secret: secret}));
app.use('/api/users', expressJWT({secret: secret})
.unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/posts', require('./controllers/posts'));
app.use('/api/users', require('./controllers/users'));

app.post('/api/auth', function(req, res) {
  console.log("api is happening");
  console.log(req.body);

  // example query: models.post.find({where: {id: req.params.id}}).then(function(err, post) {


  models.user.findAll({where: {email: req.body.email}}).then(function(err, user) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      console.log({user: user, token: token});
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/home.html'));
});

app.listen(3000);
