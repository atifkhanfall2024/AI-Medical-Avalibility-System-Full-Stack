const socket  = require('socket.io')
const ConversationalModel = require('../models/ConversationalModel')

const InitializeSocket = (server)=>{
    const io = socket(server , {
      cors:{
          origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
      }
    })
    
    
    // making connection
    
    io.on('connection' ,(socket)=>{
      
    socket.on("JoinChat" , ({ name, userid , id })=>{
       const roomId = [userid , id].sort().join("_")
       console.log(name + ' joined room' , roomId);
       socket.join(roomId)
    })

    socket.on('SendMessages' , async({name , userid , id , text , time , hour , minute})=>{
  const roomId = [userid , id].sort().join("_")
       console.log(name + ' Send Message ' , text);

       let chat = await ConversationalModel.findOne({
        participants:{$all:[userid , id]}
       })
       if(!chat){
      chat = new ConversationalModel({
        participants:[userid , id],
        messages:[]
      })
       }

       chat.messages.push({
        senderId:userid,
        text,
        name,
        time
       })

       await chat.save()

       io.to(roomId).emit('RecievedMessage' , {name, userid , text , time , hour , minute})

    })

    

    })
}

module.exports = InitializeSocket