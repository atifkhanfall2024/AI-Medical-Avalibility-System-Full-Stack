const PharmacyModel = require("../../models/PharmacyModel")
const RequestModel = require("../../models/RequestModel")
const SearchingApi = require("../../services/AI/search")

const RequestTablet = async(req,res)=>{

    try {
        const {Query , Location} = req.body
if (!Query || !Location) {
  return res.status(400).json({ message: "Query and location required" });
}
       const response =  await SearchingApi(Query)
       //console.log(req.user);
       // now i want here to store user request
      const request = await RequestModel.create({
        userId:req.user._id,
        originalText:Query,
        medicineName:response,
        location:{
            type:"Point",
            coordinates:Location
        },
        
       })

       const pharmacies = await PharmacyModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: Location,
          },
          $maxDistance: 10000,
        },
      },
      isApproved: true,
      isOnline: true,
    });

    //console.log(pharmacies);

       return res.status(201).json({
      success: true,
      message: "Request created successfully",
      pharma: pharmacies,
      data: request
    });

    } catch (error) {
         console.error(error); 

  return res.status(500).json({
    message: error.message,
  });
    }

}

module.exports = RequestTablet