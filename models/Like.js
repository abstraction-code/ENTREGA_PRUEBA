const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Like = sequelize.define('Like', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
});
module.exports=Like