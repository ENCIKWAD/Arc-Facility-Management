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
    startDate: Date,
    endDate: Date,
    status: String
    
});

module.exports = mongoose.model('Request', RequestSchema);