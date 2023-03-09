const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Post = sequelize.define('Post', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING(60),
		allowNull: false
	},
	content: {
		type: DataTypes.TEXT(4000),
		allowNull: false
	},
	img: {
		type: DataTypes.TEXT,
		defaultValue:"https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
		allowNull: false
	},
	date: {
		type: DataTypes.DATEONLY, // Agregar una columna de fecha sin hora
		defaultValue: DataTypes.NOW, // Establecer valor predeterminado a la fecha actual
	},
});

module.exports=Post