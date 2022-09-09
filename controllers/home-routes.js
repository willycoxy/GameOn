const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Love, Dislike } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
    Post.findAll({
      attributes: [
        "id",
        "post_content",
        "title",
        "created_at",
        [sequelize.literal("(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)"), "love_count"],
        [sequelize.literal('(SELECT COUNT(*) FROM dislike WHERE post.id = dislike.post_id)'), 'dislike_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          }
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
      .then(dbPostData => {
        // passes a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("homepage", {
          posts, 
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get("/register", (req, res) => {

    if (req.session.loggedIn) {
      res.redirect("homepage");
      return;
    }


    res.render("register");
  });

  router.get("/add-thread", (req, res) => {

    res.render("add-thread");
  });

  router.get("/add-thread-baseball", (req, res) => {
    res.render("add-thread-baseball");
  });

  router.get("/add-thread-basketball", (req, res) => {
    res.render("add-thread-basketball");
  });

  router.get("/add-thread-football", (req, res) => {
    res.render("add-thread-football");
  });

  router.get("/add-thread-hockey", (req, res) => {
    res.render("add-thread-hockey");
  });

  router.get("/add-thread-fantasy", (req, res) => {
    res.render("add-thread-fantasy");
  });

  router.get("/add-thread-fantasy-baseball", (req, res) => {
    res.render("add-thread-fantasy-baseball");
  });

  router.get("/add-thread-fantasy-football", (req, res) => {
    res.render("add-thread-fantasy-football");
  });
  //test 4
  router.get("/forums-baseball", (req, res) => {
    res.render("forums-baseball");
  });
  router.get("/forums-basketball", (req, res) => {
    res.render("forums-basketball");
  });
  router.get("/forums-hockey", (req, res) => {
    res.render("forums-hockey");
  });
  router.get("/forums-football", (req, res) => {
    res.render("forums-football");
  });
  router.get("/forums-fantasy", (req, res) => {
    res.render("forums-fantasy");
  });
  router.get("/forums-fantasy-baseball", (req, res) => {
    res.render("forums-fantasy-baseball");
  });
  router.get("/forums-fantasy-football", (req, res) => {
    res.render("forums-fantasy-football");
  });
  //test 4


  router.get("/post/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "post_content", "created_at", 
      [sequelize.literal("(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)"), "love_count"],
      [sequelize.literal('(SELECT COUNT(*) FROM dislike WHERE post.id = dislike.post_id)'), 'dislike_count']
    ],
      include: [
        {
          model: Comment, 
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User, 
            attributes: ["username"]
          }
        },
        {
          model: User, 
          attributes: ["username"]
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("single-post", {
        post, 
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


  router.get('/livechat', (req, res) => {
   
    res.render('livechat');
  });

  router.get('/homepage', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    
    res.render('homepage');
  });

  router.get('/policy', (req, res) => {
    res.render('policy');
  });





module.exports = router;