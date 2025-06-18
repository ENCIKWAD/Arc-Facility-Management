const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title:{ type: String, required: true },
    message: {type: String, required: true },
    publishDate: {
        type: Date,
        default: Date.now
    },
    published: { type: Boolean, default: false},
}, {timestamps: true});

module.exports = mongoose.model('Announcement', announcementSchema);