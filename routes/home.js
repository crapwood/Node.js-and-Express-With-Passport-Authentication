var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("layout", {
    page: "home",
    title: "Simple User Authentication dashboard"
  });
});

module.exports = router;
