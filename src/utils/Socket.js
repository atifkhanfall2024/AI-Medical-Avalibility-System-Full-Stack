const socket  = require('socket.io')
const ConversationalModel = require('../models/ConversationalModel')
const PaymentModel = require('../models/PaymentModel')

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
     //  console.log(name + ' joined room' , roomId);
       socket.join(roomId)
    })

    socket.on("SendMessages", async ({ name, userid, id, text, time, hour, minute }) => {
  try {
    if (!userid || !id || !text) {
      socket.emit("MessageError", {
        message: "userid, receiver id and text are required",
      });
      return;
    }

    const roomId = [userid, id].sort().join("_");
    const free_chat_limit = 10;

    let chat = await ConversationalModel.findOne({
      participants: { $all: [userid, id] },
    });

    if (!chat) {
      chat = new ConversationalModel({
        participants: [userid, id],
        messages: [],
      });
    }

    const paidSubscription = await PaymentModel.findOne({
      userId: userid,
      status: "paid",
      plan: { $in: ["basic", "pro", "premium"] },
      subscriptionEndDate: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    const hasActiveSubscription = Boolean(paidSubscription);

    console.log("Has active subscription:", hasActiveSubscription);
    console.log("Paid subscription:", paidSubscription);

    if (!hasActiveSubscription) {
      const countUserMessage = chat.messages.filter(
        (m) => m.senderId && m.senderId.toString() === userid.toString()
      ).length;

      console.log("Free user message count:", countUserMessage);

      if (countUserMessage >= free_chat_limit) {
        socket.emit("MessageLimitReached", {
          message: "Free message limit reached. Please buy a subscription.",
        });
        return;
      }
    }

    const newMessage = {
      senderId: userid,
      text,
      name,
      time,
    };

    chat.messages.push(newMessage);

    await chat.save();

    io.to(roomId).emit("RecievedMessage", {
      senderId: userid,
      userid,
      name,
      text,
      time,
      hour,
      minute,
    });
  } catch (error) {
    console.log("SendMessages socket error:", error);

    socket.emit("MessageError", {
      message: "Something went wrong while sending message",
    });
  }
});

    

    })
}

module.exports = InitializeSocket