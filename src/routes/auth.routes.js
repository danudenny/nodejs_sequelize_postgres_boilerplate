const verifySignUp = require("../middleware/verify_signup");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//   Authenticate Local
  app.post("/api/auth/signup",[verifySignUp.checkDuplicateEmail],controller.signup);
  app.post("/api/auth/signin", controller.signin);
};