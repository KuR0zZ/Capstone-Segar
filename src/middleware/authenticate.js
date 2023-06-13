const passport = require("passport");

const authenticate = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    const token = req.headers.authorization.split(' ')[1];
    if (err) {
      return res.status(500).json({error: true, message: "Something went wrong" });
    }
    if (!user || user.token == 'null' || user.token != token) {
      return res.status(401).json({error: false, message: "Authentication failed" });
    }
    next();
  })(req, res, next);
};

module.exports = authenticate;