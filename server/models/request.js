const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: Date,
    endDate: Date,
    status: Boolean
    
});

module.exports = mongoose.model('Request', RequestSchema);