const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    location: String,
    minCap: Number,
    Type: String

})

module.exports = mongoose.model('Facility', facilitySchema);