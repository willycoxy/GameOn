const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// All routes have been tested in Insomnia.

// Gets all Users

router.get("/", (req, res) => {
    Post.findAll({
        order: [["created_at", "DESC"]],
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
      attributes: ["id","post_content","title","created_at"],
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
        user_id: req.body.user_id,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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