const mongoose = require('mongoose')
const ConversationSchema = new mongoose.Schema({

   requestId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Request"
   },

   pharmacyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Pharmacy"
   },

   messages:[
      {
          senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         },

            text:{
            type:String,
            required:true
         },

         seen:{
            type:Boolean,
            default:false
         },

         createdAt:{
            type:Date,
            default:Date.now
         }
      }
   ],

   lastMessage:String,

   lastMessageTime:Date

},{timestamps:true})


module.exports = mongoose.model('ConversationalModel' , ConversationSchema)