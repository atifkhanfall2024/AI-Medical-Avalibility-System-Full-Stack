const {CompareToken} = require('../helpers/JWT/token')
const UserModel = require('../models/UserModel')



const ValidateToken = async(req,res , next)=>{

    try {
        
        const token = req.cookies.token
        if(!token){
            return res.status(401).send('Please Login ! Token is not present')
        }

        // if token present then verify
     const verify =  await CompareToken(token)
        if(!verify){
             return res.status(401).send('Token is not Correct')
        }
        //console.log('verify ' , typeof verify);
        const userid = verify.id
       // console.log(userid);
        // now check this user id with user model 

        const user = await UserModel.findById(userid).select("-password")
        if(!user){
            return res.status(404).send('user not found')

        }

        req.user = user
        next()

    } catch (error) {
          return res.status(500).json({ message: error.message || error });
    }

}

module.exports = ValidateToken