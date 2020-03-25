var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

/* GET home page. */
router.get("/", ensureAuthenticated, function(req, res, next) {
  res.render("layout", {
    page: "home",
    title: "Simple User Authentication dashboard",
    name: req.user.name
  });
});

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success_msg", "You have succesfully logged out");
  res.redirect("/login");
});

module.exports = router;
