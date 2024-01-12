const User = require("../models/users");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async signUp(req, res) {
    let { fName, lName, email, password } = req.body;
    // removing white spaces
    fName = fName.trim();
    lName = lName.trim();
    email = email.trim();
    password = password.trim();

    if (fName == "" || lName == "" || email == "" || password == "") { // checking if any field is empty
      res.status(400).json({ message: "All fields are required" });
    } else if (password.length < 8) { // checking if password is less than 8 characters
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    } else {
      // hashing password
      const saltRounds = 10; // salt rounds for hashing
      User.find({ email })
        .then((result) => {
          
          if (result.length) { // if account exists
            res.status(400).json({ message: "Account already exists" });
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
              });
              newUser
                .save() // saving user to database
                .then((result) => {
                  res
                    .status(200)
                    .json({ message: "Account created successfully" });
                })
                .catch((err) => {
                  res.status(400).json({ message: "Error creating account" });
                });
            });
          }
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  }

  static async login(req, res) {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (email == "" || password == "") {
      res.status(400).json({ message: "Please fill both email and password" });
    } else {
      User.find({ email })
        .then((data) => {
          if (data.length) {
            let user = data[0];
            bcrypt.compare(password, data[0].password).then((result) => { // comparing password with hashed password
              if (result) {
                req.user = user;
                res.render(`${user.role}Home`, {user: user});
              } else {
                res.status(400).json({ message: "Invalid credentials" });
              }
            });
          }
          else{
            res.status(400).json({ message: "Invalid credentials" });
          }
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  }

 
};
