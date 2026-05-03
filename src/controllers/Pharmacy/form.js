const PharmacyModel = require("../../models/PharmacyModel")
const SearchingApi = require("../../services/AI/search")
const getCoordinates = require("../../utils/getCoordinates")

const PharmacyForm = async(req,res)=>{

    try {
        
        const {name , location , isOnline , phone } = req.body

        if(!name || !location || !phone){
            return res.status(403).json({success:false , message:"All Fields Required"})
        }

        if(req.user.status === "Pending"){
            return res.status(403).json({success:false , message:"Status not Approved Yet"})
        }
        const fixlocation = await SearchingApi(location)
        console.log(fixlocation)
        const coords =await getCoordinates(fixlocation)
      console.log("coordss " , coords);
        const response = await PharmacyModel.create({
            userId:req.user._id,
            name , 
            location:{
                type:"Point",
                coordinates:coords
            },
            phone ,
            isApproved:true,
            isOnline ,
        
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