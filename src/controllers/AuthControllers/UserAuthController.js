const UserModel = require("../../models/UserModel")
const {Encrypt} = require('../../helpers/Bcryption/bcrypt')
const SignUp = async(req,res)=>{
const sendOtp = require('../../services/nodemailer/sendmail')
// it take values form body
try {
    
    const {Role , FullName , Email , Password , PhoneNumber} = req.body
     const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
     req.session.Email = Email 
      const hashpass = await Encrypt(Password)
       const otp = Math.floor(100000 + Math.random() * 900000);

       const hashOtp = await Encrypt(otp.toString())
       await sendOtp(Email , otp)
     const user = await UserModel(
        {
            Role ,
            FullName,
            Email ,
            Password:hashpass,
            PhoneNumber,
            OTP:hashOtp,
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