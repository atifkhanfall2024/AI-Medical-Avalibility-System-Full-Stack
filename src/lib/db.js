const mongoose = require('mongoose')
require('dotenv').config()
const DBConnection  = async()=>{

     await mongoose.connect(process.env.Connection_String)
   
}

module.exports = DBConnection