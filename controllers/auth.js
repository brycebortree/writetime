// import models at the top
var db = require('../models');

// alter the POST signup route
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    res.redirect('/');
  }).catch(function(err) {
    res.send(err);
  });
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.user.authenticate(email, password, function(err, user) {
    if (err) {
      res.send(err);
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.send('user and/or password invalid');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});