const { Decrypt } = require("../../helpers/Bcryption/bcrypt")
const SignJwt = require("../../helpers/JWT/token")
const UserModel = require("../../models/UserModel")

const Login = async(req,res)=>{
 try {
    
    const {Email  , Password} = req.body

    // first of all we will check user by email
    //console.log(Email);
      req.session.Email = Email
    if(!Email || Email === null || Email ===''){
                return res.status(401).json({success:false , message:"Email is Required"})
    }
     if(!Password || Password === null || Password ===''){
                return res.status(401).json({success:false , message:"Password is Required"})
    }

    const user = await UserModel.findOne({Email})
     if(!user){
        return res.status(404).json({success:false , message:"User Not Found"})
     }
     //console.log(user);

     // now check user verification
     if(!user.IsVerified){
             return res.status(401).json({success:false , message:"Verified your Account First"})
     }

     const CheckPass = await Decrypt(Password , user.Password)
     if(!CheckPass){
          return res.status(401).json({success:false , message:"Invalid Credantials"})
     }

     // set cookies 
     const token = await SignJwt({data:user._id})
     //console.log(token);

    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
      })

    res.status(200).json({success:true , message:user})

 } catch (error) {
              res.json({
    success: false,
    message: error.message || error ||  " Something went Wrong",
  });
 }
}

module.exports = Login