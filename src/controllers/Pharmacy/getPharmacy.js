const PharmacyModel = require("../../models/PharmacyModel")

const GetPharmacyy = async(req,res)=>{
  try {
  const id = req.user._id
    if(!id){
            return res.status(401).json({success:false , message:"Field is Required"})
    }


    const userPharmacy = await PharmacyModel.findOne({userId:id})
   //console.log("userpharma" , userPharmacy);
    if(!userPharmacy){
        return res.status(401).json({success:false , message:"Pharmacy Not found"}) 
    }

    return res.json({success:true , message:userPharmacy})

  } catch (error) {
    console.log(error || error.message || "Something went wrong");
  }
}

module.exports = GetPharmacyy