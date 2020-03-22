var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("layout", { page: "signup", title: "SignUp" });
});

router.post("/", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const hashesPassword = await bcrypt.hash(req.body.password, 10);
    res.render("layout", { page: "login", title: "User Login" });
  } catch (error) {
    res.render("layout", { page: "signup", title: "SignUp" });
  }
});

module.exports = router;
