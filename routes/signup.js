var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("layout", { page: "signup", title: "SignUp" });
});

router.post("/", (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  let errors = [];

  // Check password length and validity
  if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
    errors.push(
      "password must contain 8 characters and atleast 1 number, 1 uppercase and lowercase letter"
    );
  }

  // Check if given password is the same as the confirmpassword
  if (password !== confirm_password) {
    errors.push("passwords do not match");
  }

  // Must stay on current page if errors exist
  if (errors.length > 0) {
    res.render("layout", {
      page: "signup",
      title: "SignUp",
      errors: errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push("email already exist, try logging in");
        res.render("layout", {
          page: "signup",
          title: "SignUp",
          errors: errors,
          name,
          email,
          password,
          confirm_password
        });
      } else {
        // const hashedPassword = bcrypt.hash(req.body.password, 10);
        const hashedPassword = "";
        bcrypt.hash(password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          hashedPassword = hash;
        });
        const newUser = new User({
          name: name,
          email: email,
          password: hashedPassword
        });
        newUser.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            console.log(user);
          }
        });
        res.redirect("/login");
      }
    });
  }
});

module.exports = router;
