const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const User = require("./User");
const Category = require("./Category");

// Definimos las relaciones entre los modelos
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.belongsToMany(Post, { through: Like, foreignKey: "userId" });
Post.belongsToMany(User, { through: Like, foreignKey: "postId" });

Post.belongsTo(Category, { foreignKey: 'CategoryId' });
Category.hasMany(Post, { foreignKey: 'CategoryId' });

// Exportamos los modelos
module.exports = {
	User,
	Post,
	Comment,
	Like,
	Category,
};
