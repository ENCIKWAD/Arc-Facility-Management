const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  title: String,
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  minCap: Number,
  price: Number,
  capacity: Number,
  duration: Number,
  startTime: Date,
  endTime: Date,

  status: {
    type: String,
    enum: ['pending', 'awaiting_payment', 'paid', 'approved', 'rejected'],
    default: 'pending'
  },

  paymentIntentId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Prevent OverwriteModelError when this file is reloaded
module.exports =
  mongoose.models.Request ||
  mongoose.model('Request', RequestSchema);
