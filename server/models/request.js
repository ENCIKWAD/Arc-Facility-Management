const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    title: String,
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    minCap: Number,
    price: Number,
    date: String,
    capacity: Number,
    duration: Number,
    startTime: Date,
    endTime: Date,
    status: String
    
});

module.exports = mongoose.model('Request', RequestSchema);