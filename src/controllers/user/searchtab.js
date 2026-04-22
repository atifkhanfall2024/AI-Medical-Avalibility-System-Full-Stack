const SearchingApi = require("../../services/AI/search")

const RequestTablet = async(req,res)=>{

    try {
        const {Query , Location} = req.body

       const response =  await SearchingApi(Query)

       // now i want here to store user request
       

    } catch (error) {
        return res.json({message:error})
    }

}

module.exports = RequestTablet