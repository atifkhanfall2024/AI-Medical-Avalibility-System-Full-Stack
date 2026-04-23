const UserModel = require("../../models/UserModel");

const ApprovedReject = async(req,res)=>{

    try {
        
        const {userId , status} = req.body
         if (!userId || !status) {
      return res.status(400).json({
        success: false,
        message: "userId and status are required",
      });
    }

     const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = status
    await user.save()
     return res.status(200).json({
      success: true,
      message: `Pharmacy ${status} successfully`,
      data: user,
    });

    } catch (error) {
            return res.status(500).json({
      success: false,
      message: error.message,
    });
    }

}

module.exports = ApprovedReject