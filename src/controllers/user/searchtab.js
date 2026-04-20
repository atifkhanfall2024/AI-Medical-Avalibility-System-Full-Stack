const SearchingApi = require("../../services/AI/search")

const RequestTablet = async(req,res)=>{

    try {
        const {Query} = req.body

       const response =  await SearchingApi(Query)

       return res.json({message:response})

    } catch (error) {
        return res.json({message:error})
    }

}

module.exports = RequestTablet