const { Encrypt } = require("../../helpers/Bcryption/bcrypt");
const UserModel = require("../../models/UserModel");
const sendOtp = require("../../services/nodemailer/sendmail");

const ResendOtp = async(req,res)=>{

    try {
        
        const {Email} = req.body
        req.session.Email = Email
        const otp = Math.floor(100000 + Math.random() * 900000);
         if(!Email || Email === null || Email ===''){
                return res.status(401).json({success:false , message:"Email is Required"})
    }
        const user = await UserModel.findOne({Email})
        if(!user){
            return res.status(404).json({success:false , message:"User Not Found"})
        }
         const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
         const hashotp = await Encrypt(otp.toString())
         user.OTP = hashotp
        user.expiresIn = expiresIn
        await user.save()
        await sendOtp(Email , otp)
        
        return res.status(200).json({success:true , message:"OTP Resend Success"})


    } catch (error) {
                    res.json({
    success: false,
    message: error.message || error ||  " Something went Wrong",
  });
    }

}


module.exports = ResendOtp