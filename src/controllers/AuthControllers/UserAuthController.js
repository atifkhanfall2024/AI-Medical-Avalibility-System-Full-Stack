const UserModel = require("../../models/UserModel")
const {Encrypt} = require('../../helpers/Bcryption/bcrypt')
const SignUp = async(req,res)=>{
const sendOtp = require('../../services/nodemailer/sendmail')
const validator = require('validator')
// it take values form body
try {
    
    const {Role , FullName , Email , Password , PhoneNumber} = req.body
    let location = req.body.location
    const License = req.files?.License?.[0]?.path || "";
    //console.log("photo " ,  req.file ? req.file.path : "");
     const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
     req.session.Email = Email 
      const hashpass = await Encrypt(Password)
       const otp = Math.floor(100000 + Math.random() * 900000);

if (Role === "Pharmacy" && !License) {
  return res.status(400).json({
    success: false,
    message: "Pharmacy license is required",
  });
}

       if(!validator.isEmail(Email))
       {
        return res.status(403).json({success:false , message:'Email is INcorrect format'})
       }
       if(!validator.isStrongPassword(Password))
       {
        return res.status(403).json({success:false , message:'Password should be strong'})
       }
       const hashOtp = await Encrypt(otp.toString())
       await sendOtp(Email , otp)

    if (typeof location === "string") {
  location = JSON.parse(location);
}
location = location.map(Number);

     const user =  new UserModel(
        {
            Role ,
            FullName,
            Email ,
            Password:hashpass,
            PhoneNumber,
            OTP:hashOtp,
        Location:{
            type:"Point",
            coordinates:location
        },
        Photo:req.files?.Photo?.[0]?.path,
        License ,
        expiresIn
        }
     )
     // await sendOTP(PhoneNumber)
     await user.save()
     return res.status(200).send('OTP Send SuccessFully')

} catch (error) {
    return res.status(401).send(error.message || error || "Something Went Wrong")
}

}


module.exports = SignUp