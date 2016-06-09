var express = require('express');
var models = require('../models');
var jwt = require('jsonwebtoken');
var router = express.Router();

var secret = "behindtheuniverse";


router.route('/')
  .get(function(req, res) {
    models.user.find().then(function(users, err) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    models.user.create(req.body)
    .then(function(user, err) {
      console.log(err);
      if (err) return res.status(500).send(err);
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

router.get('/:id', function(req, res) {
  models.user.findById({where: {id: req.params.id}}).then(function(user, err) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;
