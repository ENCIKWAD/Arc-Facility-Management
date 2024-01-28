const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: String,
    type: String,
    message: String,
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        default: null
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Report', reportSchema);