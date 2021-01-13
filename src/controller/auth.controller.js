const db = require('../../database/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.User;
const Role = db.Role;

exports.signup = (req, res) => {
	User.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10)
		}).then(() => {
			res.status(200).send({
				message: 'User succesfully created',
				data: req.body
			})
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
}

exports.signin = (req, res) => {
	User.findOne({
			where: {
				email: req.body.email
			}
		})
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "User Not found."
				});
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			var token = jwt.sign({
				id: user.id
			}, process.env.JWT_SECRET, {
				expiresIn: 86400 // 24 hours
			});

			if (token) {
				res.status(200).send({
					id: user.id,
					email: user.email,
					accessToken: token
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
		});
};