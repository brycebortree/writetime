var express = require('express');
var models = require('../models');
var jwt = require('express-jwt');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    models.post.findOne().then(function(posts, err) {
      if (err) return res.status(500).send(err);
      res.send(posts);
    });
  })
  .post(jwt({secret: "behindtheuniverse"}), function(req, res) {
    models.user.findById(req.user.id).then(function(user, err) {
      user.createPost(req.body).then(function(post, err) {
      if (err) return res.status(500).send(err);
      res.send(post);
      });
    })
  });

router.route('/all')
  .get(function(req, res){
    models.post.findAll().then(function(posts, err){
      if (err) return res.status(500).send(err);
      res.send(posts);
    });
  })


router.route('/:id')
  .get(function(req, res) {
    console.log("post id", req.params.id);
      models.post.find({where: {id: req.params.id}}).then(function(post, err) {
        post.getUser({where: {id: post.userId}}).then(function(user, err) {
        if (err) return res.status(500).send(err);
        res.send({user: user, post: post});
      });
    });
  })
  .post(function(req, res) {
    models.post.find({where: {id: req.params.id}}).then(function(post, err) {
      post.update({
        title: req.body.title,
        content: req.body.content
      })
      if (err) return res.status(500).send(err);
      res.send(post);
    });
  })
  .delete(function(req, res) {
    models.post.find({where: {id: req.params.id}}).then(function(post, err) {
      if (err) {
        return res.status(500).send(err);
      } else
      return post.destroy();
      res.send({'message': 'success'});
    });
  });

module.exports = router;
