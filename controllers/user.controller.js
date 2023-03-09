const { User, Post, Comment } = require("../models/index");

const jwt = require('jsonwebtoken')

exports.loginUser = async (req, res) => {
	console.log('llamadon a login');
	const { email, password } = req.body;
	try {
		const user = await User.findOne({
			where: { email, password }
		});

		if (!user) {
			return res.render("mains/login", {
				pageTitle: "Login",
				user: null,
				errorMessage: 'Creedenciales incorrectas',
				path: "/",
			});
		}

		const { id, admin } = user
		// Generar un JWT con la información del usuario
		const token = jwt.sign({ id, email, admin }, 'mysecret');

		res.cookie('etoken', token);

		res.render("mains/login", {

			pageTitle: "Login",
			user: user,
			errorMessage: 'Ya está logueado',
			path: "/",
		});


	} catch (error) {
		console.log(error);

		res.render("mains/login", {
			pageTitle: "Login",
			user: null,
			errorMessage: 'No se encontró usuario',
			path: "/",
		});


	}


	//const match = await bcrypt.compare(password, user.password);
	//if (!match) {
	//	return res.status(401).send('Credenciales incorrectas');
	//}

}

exports.logout = async (req, res) => {
	res.clearCookie('etoken');
	// Redirigir al usuario a la página de inicio
	res.redirect('/');
}

exports.postUser = async (req, res) => {
	try {
		const { name, email, password, isAdmin } = req.body;

		// Verificar si el usuario ya existe en la base de datos
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.render('mains/register', {
				pageTitle: 'Register',
				path: '/',
				user: null,
				errorMessage: 'EL EMAIL YA SE ENCUENTRA REGISTRADO'
			});
		}

		// Crear el hash de la contraseña

		// Crear el usuario
		const user = await User.create({
			name,
			email,
			password,
			admin: isAdmin
		});

		// Redireccionar al usuario a la página de inicio de sesión
		return res.render('mains/register', {
			pageTitle: 'Register',
			path: '/',
			user: null,
			errorMessage: 'SE REGISTRÓ EXITOSAMENTE'
		});
	} catch (error) {
		console.log(error);
		res.render('mains/register', {
			pageTitle: 'Register',
			path: '/',
			user: null,
			errorMessage: 'No se pudo crear el usuario'
		});
	}
};

exports.addPost = async (req, res) => {
	try {
		const { title, content,img } = req.body;

		// Obtenemos el token de la cookie y lo decodificamos
		const {id} = req.user


		// Creamos el post
		const post = await Post.create({
			title,
			img,
			content,
			userId: id
		});

		return res.redirect("/")

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error al crear el post' });
	}


}

exports.addComment = async (req, res) => {
	try {
		const { postId, commentText } = req.body;
		const userId = parseInt(req.user.id);
		console.log('1');

		const post = await Post.findByPk(parseInt(postId));

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}console.log('2');

		const comment = await Comment.create({
			content: commentText,
			userId,
			postId
		});

		return res.redirect(`/post/${postId}`);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error al crear el comentario' });
	}
}


exports.getLikes= async (req, res, next) => {

	try {
		const {postId} = req.body;
		const userId = parseInt(req.user.id); // suponiendo que el ID del usuario que dio like viene en el cuerpo de la solicitud
		console.log('obtenido postid userid');
		// Verificar si la publicación y el usuario existen
		const post = await Post.findByPk(parseInt(postId));
		const user = await User.findByPk(userId);
		console.log('encontrado');
		if (!post) {
			return res.status(404).json({ message: 'Publicación no encontrada' });
		}

		if (!user) {
			next()
		}

		// Crear el like
		const like = await Like.create({
			userId: userId,
			postId: postId
		});

		const likesPost = await findAll({ where: { postId }})

		return res.render('/likes',{
			pageTitle: "Likes",
			path: "/",
			products: likesPost
		})
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Error al dar like' });
	}
};

