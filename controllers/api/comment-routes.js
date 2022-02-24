// imports 
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  console.log('------------------------------------------------------------------------------------------working');
  console.log(req.body);
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  if (req.session) {
    Comment.create({ body: req.body.comment_text, postId: req.body.postId, userId: req.session.user_id})
      .then(commentData => {
        res.json(commentData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;