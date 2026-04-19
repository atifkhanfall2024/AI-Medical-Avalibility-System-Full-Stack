const jwt = require('jsonwebtoken')


const SignJwt = async (data) => {
  return await jwt.sign(data , process.env.Secret_Key , {expiresIn:'1d'} )
}

module.exports = SignJwt