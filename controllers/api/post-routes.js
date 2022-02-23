// imports
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// creates new content
router.post("/", withAuth, (req, res) => {
    console.log(req.body);
    Post.create({...req.body, userId: req.session.user_id})
      .then((postData) => res.json(postData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // updates content
  router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // deletes unwanted content
  router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;