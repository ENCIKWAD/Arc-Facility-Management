const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: String,
    type: String,
    description: String,
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Report', reportSchema);