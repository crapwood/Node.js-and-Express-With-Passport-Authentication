var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("layout", { page: "index", title: "Simple User Authentication" });
});

module.exports = router;
