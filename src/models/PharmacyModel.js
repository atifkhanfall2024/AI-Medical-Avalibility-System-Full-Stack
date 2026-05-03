const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },

  isOnline: {
    type: Boolean,
    default: false,
  },

  isApproved: {
    type: Boolean,
    default: false,
  },

  phone: {
    type: String,
    match: /^(?:\+92|0092|0)3[0-9]{9}$/,
    required: true
  },



  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  rating: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

PharmacySchema.index({ location: "2dsphere" });
PharmacySchema.index({ isApproved: 1, isOnline: 1 });

module.exports = mongoose.model('Pharmacy', PharmacySchema);