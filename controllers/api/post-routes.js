const router = require("express").Router();
const { Post, User, Comment, Love, Dislike  } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

// All routes have been tested in Insomnia.

// get all posts

router.get("/", (req, res) => {
    Post.findAll({
      attributes: [
        "id",
        "post_content",
        "title",
        "created_at",
        [sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'), 'love_count'],
        [sequelize.literal('(SELECT COUNT(*) FROM dislike WHERE post.id = dislike.post_id)'), 'dislike_count']
      ],
      order: [["created_at", "DESC"]],
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Gets a single Post

router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "id",
        "post_content",
        "title",
        "created_at",
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Creates a Post

router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title, 
        post_content: req.body.post_content, 
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
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

// Updates a Post's title

router.put("/:id", withAuth, (req, res) => {
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
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;