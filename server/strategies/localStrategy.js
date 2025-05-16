const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      console.log("User found:", user);
      if (!user) {
        console.log("User not found for email:", email);
        return done(null, false);
      }
      console.log("Password from request:", password);
      console.log("Hashed password from DB:", user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);
      if (!isMatch) {
        console.log("Password mismatch for email:", email);
        return done(null, false);
      }
      console.log("Login successful for:", email);
      return done(null, user);
    } catch (error) {
      console.error("Error in local strategy:", error);
      return done(error);
    }
  })
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error);
  }
});