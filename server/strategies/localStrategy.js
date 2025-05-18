const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.error("Error in local strategy:", error);
      return done(error);
    }
  })
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id);
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error);
  }
});