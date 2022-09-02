const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates Post model
class Post extends Model{}

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