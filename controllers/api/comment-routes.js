const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// All routes have been tested in Insomnia

router.get("/", (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
    if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text, 
        user_id: req.body.user_id, 
        post_id: req.body.post_id,
        
        user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  }
});

router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment foun with this id!" });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});





module.exports = router;