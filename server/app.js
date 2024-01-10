// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express(); // creating the app

const port = process.env.PORT || 8000; // setting the port

// middlewares
app.use(cors());
app.use(express.json()); // for the RESTFUL API
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); // for the images that will be uploaded


// routes
const userRoutes = require('./routes/userRoutes');



app.use('/', userRoutes);

// connecting to the database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database", err);
})


// starting the server
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
})
