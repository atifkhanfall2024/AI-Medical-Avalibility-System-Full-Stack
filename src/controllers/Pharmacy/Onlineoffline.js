const PharmacyModel = require("../../models/PharmacyModel")

const OnlineOffline = async(req,res)=>{
    try {
        
        const { id , IsActive} = req.body

        if(!IsActive || !id){
            return res.status(401).json({success:false , message:"Field is Required"})
        }
  if (typeof IsActive !== "boolean") {
      return res.json({
        success: false,
        message: "Only boolean values allowed",
      });
    }

        const ChangeStatus = await PharmacyModel.findByIdAndUpdate(id ,{isOnline:IsActive})
        if(!ChangeStatus){
            return res.status(401).json({success:false , message:"Id not found"})
        }
         return res.status(201).json({success:true , message:`Status Change To ${IsActive} Success`})

    } catch (error) {
         return res.status(401).json({success:false , message:error || error.message || "Something went Wrong"})
    }
}