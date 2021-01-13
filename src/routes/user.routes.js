const { authJwt } = require("../middleware");
const controller = require("../controller/users.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


//   User
  app.get( "/api/get/users", [authJwt.verifyToken], controller.findAll);
  app.get( "/api/get/user/:id", [authJwt.verifyToken], controller.findOne);
  app.put( "/api/update/user/:id", [authJwt.verifyToken], controller.updateUser);
  app.delete( "/api/delete/user/:id", [authJwt.verifyToken], controller.deleteUser);


};