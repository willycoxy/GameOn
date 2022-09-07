const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Love, Dislike } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ["id", "post_content", "title", "created_at",
        [sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'), 'love_count'],
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render("forums", { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//test 3
router.get("/forums-baseball", (req, res) => {
  res.render("forums-baseball", { posts, loggedIn: true });
});
router.get("/forums-basketball", (req, res) => {
  res.render("forums-basketball", { posts, loggedIn: true });
});
router.get("/forums-hockey", (req, res) => {
  res.render("forums-hockey", { posts, loggedIn: true });
});
router.get("/forums-football", (req, res) => {
  res.render("forums-football", { posts, loggedIn: true });
});
router.get("/forums-fantasy", (req, res) => {
  res.render("forums-fantasy", { posts, loggedIn: true });
});
router.get("/forums-fantasy-baseball", (req, res) => {
  res.render("forums-fantasy-baseball", { posts, loggedIn: true });
});
router.get("/forums-fantasy-football", (req, res) => {
  res.render("forums-fantasy-football", { posts, loggedIn: true });
});
//test 3
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

  router.put('/love', (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Post.love({ ...req.body, user_id: req.session.user_id }, { Love, Comment, User })
        .then(updatedLikedData => res.json(updatedLikedData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

  router.put('/dislike', (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Post.dislike({ ...req.body, user_id: req.session.user_id }, { Dislike, Comment, User })
        .then(updatedDislikedData => res.json(updatedDislikedData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
  



module.exports = router;