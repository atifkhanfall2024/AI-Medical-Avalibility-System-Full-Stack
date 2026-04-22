const RequestModel = require("../../models/RequestModel")
const SearchingApi = require("../../services/AI/search")

const RequestTablet = async(req,res)=>{

    try {
        const {Query , Location} = req.body

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

       return res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: request
    });

    } catch (error) {
        return res.json({message:error})
    }

}

module.exports = RequestTablet