var express = require('express');
var models = require('../models');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    models.post.findOne().then(function(posts, err) {
      if (err) return res.status(500).send(err);
      res.send(posts);
    });
  })
  .post(function(req, res) {
    // removed before function: req.body, 
    models.post.create(req.body).then(function(post, err) {
      if (err) return res.status(500).send(err);
      res.send(post);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    console.log(req.params.id);
    models.post.find({where: {id: req.params.id}}).then(function(post, err) {
      if (err) return res.status(500).send(err);
      res.send(post);
    });
  })
  .put(function(req, res) {
    // removed before function: req.body, 
    models.post.find({where: {id: req.params.id}}).then(function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    models.post.find({where: {id: req.params.id}}).then(function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
