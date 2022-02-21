// import
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users
router.get("/", (req, res) => {
    User.findAll({
      attributes: { exclude: ["password"] },
    })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get("/:id", (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
         
        },
        {
          model: Comment,
          include: {
            model: Post,
            attributes: ["username"],
          },
        },
      ],
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post("/", (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
      .then((userData) => {
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.username = userData.username;
          req.session.loggedIn = true;
  
          res.json(userData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // todo
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username : req.body.username
      }
    }).then(dbUser => {
      if (!dbUser) {
        res.json({message: 'No user'})
        return
      }
      const validPassword = dbUser.checkPassword(req.body.password)
      if(!validPassword) {
        res.json({message: 'Incorrect password'})
        return
      }
      req.session.save(() => {
        req.session.user_id= dbUser.id
        req.session.username = dbUser.username
        req.session.loggedIn = true

        res.json({user: dbUser, message: 'Youre now logged in'})
      })
    })
  })

// to do logout

  module.exports = router