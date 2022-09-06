const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "post_content", "title", "created_at"],
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("forums", { posts, loggedIn: true });
    })
    // testing multiple forums
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("forums-baseball", { posts, loggedIn: true });
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("forums-basketball", { posts, loggedIn: true });
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("forums-football", { posts, loggedIn: true });
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("forums-hockey", { posts, loggedIn: true });
    })
    // testing multiple forums
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
      attributes: [
        "id",
        "post_content",
        "title",
        "created_at",
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
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          
          res.render("edit-post", {
            post,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  



module.exports = router;