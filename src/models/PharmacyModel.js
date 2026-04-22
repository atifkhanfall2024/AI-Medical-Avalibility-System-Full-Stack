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

  phone: {
    type:String,
   match: /^(?:\+92|0092|0)3[0-9]{9}$/,
   required:true
  }
  ,

  // 🔥 IMPORTANT
  isApproved: {
    type: Boolean,
    default: false, // admin approval system
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link pharmacy to user account
  }

}, { timestamps: true });

// 🔥 GEO INDEX (VERY IMPORTANT)
PharmacySchema.index({ location: "2dsphere" });