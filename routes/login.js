var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("layout", { page: "login", title: "User Login" });
});

router.post("/", function(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
