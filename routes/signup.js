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
        const newUser = new User({
          name: name,
          email: email,
          password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed password
            newUser.password = hash;

            newUser
              .save()
              .then()
              .catch(err => console.log(err));
          });
        });
        req.flash("success", "You are now registered and can login");
        res.redirect("/login");
      }
    });
  }
});

module.exports = router;
