var express = require('express');
var models = require('../models');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    models.user.find().then(function(users, err) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    console.log(req.body);
    models.user.create(req.body)
    .then(function(user, err) {
      console.log(err);
      if (err) return res.status(500).send(err);
      res.send(user);
    });
  });

router.get('/:id', function(req, res) {
  models.user.findById({where: {id: req.params.id}}).then(function(user, err) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;
