const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const Initialize = passport => {
  const authenticateUser = (email, password, done) => {};

  passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};

module.exports = Initialize;
