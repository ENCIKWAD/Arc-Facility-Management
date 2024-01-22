// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const User = require('./models/users');


const app = express(); // creating the app

const port = process.env.PORT || 8000; // setting the port

// middlewares
app.use(cors());
app.use(express.json()); // for the RESTFUL API
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); // for the images that will be uploaded


// routes
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tenantRoutes = require('./routes/tenantRoutes');


app.use('/', userRoutes);
app.use('/owner',   ownerRoutes);
app.use('/admin',    adminRoutes);
app.use('/tenant', tenantRoutes);

// connecting to the database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database", err);
})


//testing
// function setUser(req, res, next){
//     try {
//         const userId = req.body._id;
//         if (userId) {
//             User.findById(userId).then((user) => {
//                 if (user) {
//                     req.user = user;
//                     next();
//                 } else {
//                     res.status(404).json({ message: "User not found" });
//                 }
//             }).catch((err) => {
//                 res.status(500).json({ message: "User ID does not exist" });
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.error("Error authenticating user:", error);
//         res.status(400).json({ message: "Error authenticating user" });
//         next();
//     }
    
// }

// starting the server
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})
