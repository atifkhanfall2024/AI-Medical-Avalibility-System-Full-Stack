const bcrypt = require('bcrypt')

const Encrypt = async(password)=>{

    return await bcrypt.hash(password , 10)
}


const Decrypt = async(password , dbpass)=>{

    return await bcrypt.compare(password , dbpass
    )
}

module.exports= {Encrypt , Decrypt}