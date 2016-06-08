var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var db = require('./models');

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
app.use('/api/comments', require('./controllers/comments'));

app.post('/api/auth', function(req, res) {
  // example query: models.post.find({where: {id: req.params.id}}).then(function(err, post) {


  db.user.find({where: {email: req.body.email}}).then(function(user, err) {
    if (err || !user) return res.status(401).send({message: 'User not found'});
    db.user.authenticate(req.body.email, req.body.password, function(err, result) {
      if (err || !result) return res.status(401).send({message: 'User not authenticated'});
      user = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name
      }
      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000)
