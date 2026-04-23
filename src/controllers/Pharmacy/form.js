const PharmacyModel = require("../../models/PharmacyModel")

const PharmacyForm = async(req,res)=>{

    try {
        
        const {name , Location , isOnline , phone ,isApproved , VerifyPhoto } = req.body

        if(!name || !Location || !phone || !VerifyPhoto){
            return res.status(403).json({success:false , message:"All Fields Required"})
        }

        if(req.user.status === "Pending"){
            return res.status(403).json({success:false , message:"Status not Approved Yet"})
        }

        const response = await PharmacyModel.create({
            userId:req.user._id,
            name , 
            location:{
                type:"Point",
                coordinates:Location
            },
            phone ,
            isApproved,
            isOnline ,
            VerifyPhoto
        })

         return res.status(201).json({
      success: true,
      message: "Pharmacy Form Create Success",
      data: response
    });

    } catch (error) {
          return res.json({message:error.message || error})
    }

}

module.exports = PharmacyForm