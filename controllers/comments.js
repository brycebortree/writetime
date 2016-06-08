var express = require('express');
var models = require('../models');
var jwt = require('express-jwt');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    console.log("request:", req);
    console.log("post id:", req.params.id);
      models.post.find({where: {id: req.params.id}}).then(function(comments, err) {
        post.getComments().then(function(user, err) {
        if (err) return res.status(500).send(err);
        res.send({user: user, comments: comments});
      });
    });
  })
  // .post(function(req, res) {
  //   models.post.find({where: {id: req.params.id}}).then(function(post, err) {
  //     post.update({
  //       title: req.body.title,
  //       content: req.body.content
  //     })
  //     if (err) return res.status(500).send(err);
  //     res.send(post);
  //   });
  // })
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

