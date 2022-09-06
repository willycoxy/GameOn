const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Love = require("./Love")
const Dislike = require("./Dislike");

// Creates associations

User.hasMany(Post, {
    foreignKey: "user_id"
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.belongsToMany(Post, {
    through: Love, 
    as: "loved_posts", 
    foreignKey: "user_id"
});

Post.belongsToMany(User, {
    through: Love, 
    as: "loved_posts", 
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

Love.belongsTo(User, {
    foreignKey: "user_id"
  });
  
  Love.belongsTo(Post, {
    foreignKey: "post_id"
  });

  User.belongsToMany(Post, {
    through: Dislike, 
    as: "disliked_posts", 
    foreignKey: "user_id"
});

Post.belongsToMany(User, {
    through: Dislike, 
    as: "disliked_posts", 
    foreignKey: "post_id"
});

Dislike.belongsTo(User, {
    foreignKey: "post_id"
});

Dislike.belongsTo(User, {
    foreignKey: "post_id"
});
  
 







module.exports = { User, Post, Comment, Love, Dislike };