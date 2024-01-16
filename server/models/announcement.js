const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: String,
    message: String,
    publishDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Announcement', announcementSchema);