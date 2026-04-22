const jwt = require('jsonwebtoken')


const SignJwt = async (data) => {
  return await jwt.sign({id:data} , process.env.Secret_Key , {expiresIn:'1d'} )
}

const CompareToken = async(token)=>{
  return await jwt.verify(token , process.env.Secret_Key)
}

module.exports = {
  SignJwt,
  CompareToken
};