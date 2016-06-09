var express = require('express');
var models = require('../models');
var jwt = require('express-jwt');
var router = express.Router();

// get mainpage of posts and post new ones

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

// pulled from the parens of FIND 
router.route('/my')
  .get(function(req, res){
    models.user.find({where: {id: req.user.id}}).then(function(user, err){
      user.getPosts().then(function(posts, err){
        res.send({user: user, posts: posts});
      });
    });
  })

// findAll is easier
router.route('/all')
  .get(function(req, res){
    models.post.findAll({
      include: [models.user]
    }).then(function(posts, err){
      if (err) return res.status(500).send(err);
      res.send(posts);
    });
  })

// individual show page
router.route('/:id')
  .get(function(req, res) {
    models.post.find({where: {id: req.params.id}}).then(function(post, err) {
      post.getComments().then(function(comments, err) {
        post.getUser({where: {id: post.userId}}).then(function(user, err) {
          if (err) return res.status(500).send(err);
          console.log("comments:", comments);
          res.send({user: user, post: post, comments: comments});
        });
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
