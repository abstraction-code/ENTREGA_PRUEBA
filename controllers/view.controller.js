//const { Post } = require("../models/index");

const { Post,Comment, User } = require("../models");

exports.getHome = async (req, res, next) => {
	let posts = []
	try {
		posts = await Post.findAll()
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving post' });
	}

	res.render("home", {
		posts,
		path: "/"
	});
}

exports.getPostById = async (req, res, next) => {
	const postId = req.params.id;
	let post, comments;
	console.log(postId+'===============');

	try {
	
		post = await Post.findByPk(postId, {
			include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
		});
		console.log('probando');

		comments = await Comment.findAll({
			where: {
				postId: postId
			}
		});

		console.log('comentarios encontrados');
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error retrieving post' });
	}
	

	res.render("mains/post", {
		comments:comments||[],
		post,
		path: "/posts/" + postId
	});
}

exports.getLogin = async (req, res, next) => {
	res.render("mains/login", {
		pageTitle: "Login",
		user: req.user,
		errorMessage: 'Ya te encuentras logueado',
		path: "/",
	});
	
};

exports.getRegister = (req, res, next) => {
	res.render('mains/register', {
		pageTitle: 'Register',
		path: '/register',
		errorMessage: req.user ? 'Ya te encuentras logueado' : null,
		user: req.user
	});

};
exports.getFormPost = (req, res, next) => {
	res.render("mains/add-post", {
		pageTitle: "Crear noticia",
		path: "/mains/add-post",
		editing: false
	});
}
