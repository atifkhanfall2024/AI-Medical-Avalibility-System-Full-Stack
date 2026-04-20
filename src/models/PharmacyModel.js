const mongoose = require('mongoose')
const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  isOnline: {
    type: Boolean,
    default: false,
  },

  phone: String,

  address: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});


const PharmacyModel = mongoose.model('Pharmacy' , PharmacySchema)
module.exports = PharmacyModel