const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Create one-to-many relationship for user and comments
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// Create one-to-many realationship for post and comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "SET NULL"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// Create one-to-many realationship for user and comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Post, Comment };
