const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  originalText: {
    type: String,
    required: true
  },

  medicineName: {
    type: String,
    required: true
  },

  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },

  responses: [
    {
      pharmacyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy'
      },
      available: Boolean
    }
  ]

}, { timestamps: true });

// 📍 Important for geo queries later
RequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Request', RequestSchema);