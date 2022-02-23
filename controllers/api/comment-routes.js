// imports 
const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  if (req.session) {
    Comment.create({...req.body, userId: req.session.user_id})
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;