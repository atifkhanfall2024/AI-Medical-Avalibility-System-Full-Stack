const { Decrypt } = require("../../helpers/Bcryption/bcrypt")
const UserModel = require("../../models/UserModel")

const VerifyMail = async(req ,res)=>{

    try {
        
        const {otp} = req.body
         //console.log(otp);
        const email = req.session.Email
        //console.log(email);
        if(!email){
            return res.status(401).json({success:false , message:'Click To Resend Otp'})
        }

       const user = await UserModel.findOne({Email:email})
       
       // verify otp 
    //console.log(user);

    if(Date.now()>user.expiresIn){
         return res.status(400).json({
      message: "OTP expired",
    });
    }

       const VerifyOtp = await Decrypt(otp , user.OTP)
       if(!VerifyOtp){
          return res.status(401).json({success:false , message:'Otp MisMatch'})
       }

       user.IsVerified=true
       user.OTP=''
       await user.save()
        res.json({
    success: true,
    message: "OTP verified",
  });

    } catch (error) {
              res.json({
    success: false,
    message: error.message || error ||  " Something went Wrong",
  });
    }
}

module.exports = VerifyMail