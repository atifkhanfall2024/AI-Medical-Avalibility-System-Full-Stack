const socket = require("socket.io");
const ConversationalModel = require("../models/ConversationalModel");
const PaymentModel = require("../models/PaymentModel");

const InitializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://65.0.89.63",
        "https://ai-medical-availability-system-full.vercel.app",
        "https://ai-medical-availability-system-full-stack-frontend-fbyoyz9wq.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("JoinChat", ({ name, userid, id }) => {
      const roomId = [userid, id].sort().join("_");

      console.log("JoinChat received:", {
        socketId: socket.id,
        name,
        userid,
        id,
        roomId,
      });

      socket.join(roomId);
    });

    socket.on("SendMessages", async ({ name, userid, id, text, time, hour, minute }) => {
      try {
        console.log("SendMessages received:", {
          socketId: socket.id,
          name,
          userid,
          id,
          text,
          time,
        });

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

        if (!hasActiveSubscription) {
          const countUserMessage = chat.messages.filter(
            (m) => m.senderId && m.senderId.toString() === userid.toString()
          ).length;

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

        console.log("Message saved and emitting to room:", roomId);

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

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.id, reason);
    });
  });

  return io;
};

module.exports = InitializeSocket;