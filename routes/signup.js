var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("layout", { page: "signup", title: "SignUp" });
});

router.post("/", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  let errors = [];
  try {
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      errors.push(
        "password must contain 8 characters and atleast 1 number, 1 uppercase and lowercase letter"
      );
      res.render("layout", {
        page: "signup",
        title: "SignUp",
        errors: errors
      });
    } else {
      const hashesPassword = await bcrypt.hash(req.body.password, 10);
      res.redirect("/login");
    }
  } catch (error) {
    res.render("layout", { page: "signup", title: "SignUp" });
  }
});

module.exports = router;
