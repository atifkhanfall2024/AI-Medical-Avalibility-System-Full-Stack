const socket  = require('socket.io')

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

    socket.on('SendMessages' , ({name , userid , id , text , time , hour , minute})=>{
  const roomId = [userid , id].sort().join("_")
       console.log(name + ' Send Message ' , text);
       io.to(roomId).emit('RecievedMessage' , {name, userid , text , time , hour , minute})

    })

    

    })
}

module.exports = InitializeSocket