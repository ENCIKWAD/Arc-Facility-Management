const User = require("../models/users");
const bcrypt = require("bcryptjs");
const Report = require("../models/Report");
const fs = require("fs");
const Announcement = require("../models/Announcement");

module.exports = class UserController {
  static async signUp(req, res) {
    let user = req.body;
    let { fName, lName, email, password, confirmPassword } = user;

    if (
      fName == "" ||
      lName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      // checking if any field is empty
      return res.status(400).json({ message: "All fields are required" });
    } else if (password.length < 8) {
      // checking if password is less than 8 characters
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    } else if (!fName.match(/^[a-zA-Z]+$/) || !lName.match(/^[a-zA-Z]+$/)) {
      return res
        .status(400)
        .json({ message: "Your name must only contain letters" });
    }
    // checking if first name is valid
    else if (!email.includes("@") && !email.includes(".")) {
      // checking if email is valid
      return res.status(400).json({ message: "Invalid email address" });
    } else if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    } // checking if password and confirm password are same
    else {
      // hashing password
      const saltRounds = 10; // salt rounds for hashing
      User.find({ email })
        .then((result) => {
          if (result.length) {
            // if account exists
            return res.status(400).json({ message: "Email already exists" });
          } else {
            bcrypt.hash(password, saltRounds).then((hashedPassword) => {
              // first hashing password
              let newUser = User({
                fName,
                lName,
                email,
                password: hashedPassword, // then saving hashed password
                role: "tenant",
                image: "default.png",
                isBanned: false,
              });
              newUser
                .save() // saving user to database
                .then((result) => {
                  return res
                    .status(200)
                    .json({ message: "Account created successfully" });
                })
                .catch((err) => {
                  return res
                    .status(400)
                    .json({ message: "Error creating account" });
                });
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    }
  }

  static async fetchAnnouncements(req, res) {
    try {
      const announcements = await Announcement.find();
      return res.status(200).json(announcements);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
  let user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.isBanned) {
    return res.status(403).json({ message: "This user has been banned" });
  }

  // Remove password before sending user object
  const { password, ...safeUser } = user._doc ? user._doc : user;

  return res.status(200).json({ message: "Login successful", user: safeUser });
}

static async checkAuth(req, res){
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "User is authenticated", user: req.user });
  } else {
    return res.status(401).json({ message: "User is not authenticated", user: null });
  }
}

  static async createReport(req, res) {
    try {
      const report = req.body;
      if (report.title == "" || report.type == "" || report.message == "") {
        return res.status(401).json({ message: "Please fill all the fields" });
      } else if (report.type == "Request Maintenance" && !report.facilityId) {
        return res.status(402).json({ message: "Please select a facility" });
      } else if (report.type == "Report Tenants" && !report.tenantId) {
        return res.status(403).json({ message: "Please select a tenant" });
      }
      else if(report.type == "Report Incident" && !report.facilityId){
        return res.status(404).json({ message: "Please select a facility" });
      }

      const newReport = await Report.create(report);

      return res
        .status(201)
        .json({ message: "Report created successfully", report: newReport });
    } catch (err) {
      return res.status(406).json({ message: err.message });
    }
  }

  static async manageAccount(req, res) {
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
    } else {
      new_image = req.body.old_image;
    }
    const user = req.body;
    const id = user._id;
    user.image = new_image;
    if (user.fName == "" || user.lName == "" || user.email == "") {
      return res.status(408).json({ message: "Please fill all the fields" });
    }
    if (user.new_password != "" && user.new_password.length < 8) {
      return res
        .status(411)
        .json({ message: "Password must be at least 8 characters" });
    }
    if (user.new_password != "") {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.new_password, saltRounds);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      return res
        .status(200)
        .json({ message: "Account updated successfully", user: updatedUser });
    } catch (err) {
      return res.status(419).json({ message: err.message });
    }
  }

  static async logout(req, res){
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  }
};
