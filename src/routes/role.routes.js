const authJwt = require("../middleware/auth_jwt");
const controller = require("../controller/role.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	//   Role Route
	app.get("/api/get/roles", [authJwt.verifyToken], controller.getAll);
	app.get("/api/get/role/:id", [authJwt.verifyToken], controller.getByPk);
	app.post("/api/create/role", [authJwt.verifyToken], controller.createRole);
};