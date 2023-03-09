const jwt = require('jsonwebtoken')

exports.Auth = (req, res, next) => {
	console.log('llamando midelware');
	const token = req.cookies.etoken;
	if (!token) {
		return res.render("mains/login", {
			pageTitle: "Login",
			user: null,
			errorMessage: 'Debes inicia sesión para usar esta funcionalidad',
			path: "/",
		});
	}


	try {
		const decoded = jwt.verify(token, 'mysecret');
		req.user=decoded
		next()

	} catch (err) {
		console.log(err);
		return res.status(401).send('Token inválido');
	}
}