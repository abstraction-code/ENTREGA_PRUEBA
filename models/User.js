
const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING,
	admin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

module.exports = User;