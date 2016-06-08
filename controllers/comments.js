var express = require('express');
var models = require('../models');
var jwt = require('express-jwt');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    models.post.find({where: {id: req.params.id}}).then(function(post, err) {
      post.getComments().then(function(comments, err) {
      if (err) return res.status(500).send(err);
      res.send({user: user, comments: comments});
    });
  });
})
  .post(jwt({secret: "behindtheuniverse"}), function(req, res) {
    console.log(req)
    models.post.findById(req.body.postId).then(function(post, err) {
      console.log("req.post.id:", req.body.postId);
      console.log("post:", post);
      post.createComment(req.body).then(function(comment, err) {
        if (err) return res.status(500).send(err);
        res.send(comment);
        });
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

