var express = require('express');
var models = require('../models');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    models.user.find().then(function(err, users) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    models.user.create(req.body)
    .then(function(err, user) {
      console.log(err);
      if (err) return res.status(500).send(err);
      res.send(user);
    });
  });

router.get('/:id', function(req, res) {
  models.user.findById({where: {id: req.params.id}}).then(function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;
