const mongoose = require('mongoose')
const validator= require('validator')

const UserSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: [true , "UserName is Required"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

    Email: {
      type: String,
      required: [true , "Password is Required"],
      unique: true,
      lowercase: true,
        index: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Incorrect Email Format ')
        }
      }
    },

    Password: {
      type: String,
      required: [true , "Password is Required"],
      minlength: 6,
   
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error('Password Should be Strong ')
        }
      }
    },

    PhoneNumber: {
      type: String,
      required: [true , "Phone Number is Required"],
      match: [/^\+92[0-9]{10}$/, "Use format +92XXXXXXXXXX"],
    },

    Role: {
      type: String,
      enum: ["User" , "Admin" , "Pharmacy"],
      default: "User",
    },

    IsVerified: {
      type: Boolean,
      default: false,
    },
    OTP:{
        type:String,
        required:[true , "Otp is Required"]
    },
      expiresIn: {
    type: Date,
    required: true,
  },
  },
  { timestamps: true }
);


const UserModel =  mongoose.model("User" , UserSchema)
module.exports = UserModel