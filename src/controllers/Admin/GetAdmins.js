const UserModel = require("../../models/UserModel")

const GetAdminCheckStatus = async(req,res)=>{

    try {
        
       const getUsers = await UserModel.find({
        status : "Pending" ,
        Role: "Admin",
        IsVerified:true
      }).select('-Password')
      if(!getUsers){
        return res.status(401).json({success:false , message:'No Pending Request Till Now'})
      }
      return res.status(200).json({success:true , message:getUsers})

    } catch (error) {
        return res.status(500).json({success:false , message:error.message || error})
    }

}

module.exports = GetAdminCheckStatus