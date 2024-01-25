const User = require("../models/users");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  static async signUp(req, res) {
    let user = req.body;
    let { fName, lName, email, password, confirmPassword } = user;

    if (fName == "" || lName == "" || email == "" || password == "" || confirmPassword == "") { // checking if any field is empty
      return res.status(400).json({ message: "All fields are required" });
    } else if (password.length < 8) { // checking if password is less than 8 characters
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    } 
    else if(!fName.match(/^[a-zA-Z]+$/) || !lName.match(/^[a-zA-Z]+$/)){
      return res.status(400).json({ message: "Your name must only contain letters" });
    } 
    // checking if first name is valid
    else if (!email.includes("@") && !email.includes(".")) { // checking if email is valid
      return res.status(400).json({ message: "Invalid email address" });
    }
    else if(password !== confirmPassword){ 
      return res.status(400).json({ message: "Password and confirm password do not match" });
    }// checking if password and confirm password are same
    else {
      // hashing password
      const saltRounds = 10; // salt rounds for hashing
      User.find({ email })
        .then((result) => {
          
          if (result.length) { // if account exists
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
                isBanned: false
              });
              newUser
                .save() // saving user to database
                .then((result) => {
                  return res
                    .status(200)
                    .json({ message: "Account created successfully" });
                })
                .catch((err) => {
                  return res.status(400).json({ message: "Error creating account" });
                });
            });
          }
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    }
  }

  static async login(req, res) {
    let user = req.body;
    let { email, password } = user;
    if (email == "" || password == "") {
      return res.status(400).json({ message: "Please fill both email and password" });
    } else {
      User.find({ email })
        .then((data) => {
          if (data.length) {
            let user = data[0];
            bcrypt.compare(password, data[0].password).then((result) => { // comparing password with hashed password
              if (result) {
                return res.status(200).json({ message: "Login successful", user });
              } else {
                return res.status(400).json({ message: "Invalid credentials" });
              }
            });
          }
          else{
            return res.status(400).json({ message: "Invalid credentials" });
          }
        })
        .catch((err) => {
          return res.status(400).json({ message: "error here" });
        });
    }
  }

 
};
