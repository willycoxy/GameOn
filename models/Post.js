const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates Post model
class Post extends Model {
    static love(body, models) {
      return models.Love.create({
        user_id: body.user_id,
        post_id: body.post_id,
      })
     .then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            "id",
            "post_content",
            "title",
            "created_at",
            [
              sequelize.literal("(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)"),
              "love_count"
            ]
          ],
        });
      })

    }
     static dislike(body, models) {
      return models.Dislike.create({
        user_id: body.user_id,
        post_id: body.post_id,
      })
     .then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            "id",
            "post_content",
            "title",
            "created_at",
            [
              sequelize.literal("(SELECT COUNT(*) FROM dislike WHERE post.id = dislike.post_id)"),
              "dislike_count"
            ]
          ],
        });
      })

    }
  }



// Creates fields and columns for the Post model

Post.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            refrences: {
                model: "user", 
                key: "id"
            }
        }
    },
    {
        sequelize, 
        freezeTableName: true, 
        underscored: true,
        modelName: "post"
    }
);

module.exports = Post;