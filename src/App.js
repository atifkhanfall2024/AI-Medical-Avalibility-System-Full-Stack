const express = require('express')
const DBConnection = require('./lib/db')
const AuthRoute = require('./routes/AuthRoutes/AuthRoute')
const session   = require('express-session')
const User = require('./routes/UserRoute/user')
const parser = require('cookie-parser')
const PharmacyRoutes = require('./routes/Pharmacy/PharmacyRoutes')
const http = require('http')
const AdminRole = require('./routes/AdminRoute/AdminRoute')
const socket = require('socket.io')
const uploadRoute = require("./routes/cloudinaryRoute/cloudRoute");
const cors = require("cors");
const InitializeSocket = require('./utils/Socket')
const ChatRoute = require('./routes/Chats/chatRpute')
const Paymentrouter = require('./routes/paymentRoute/paymentRoute')
const app = express()
app.use(cors({
   origin: [
    "http://65.0.89.63",
    "https://ai-medical-availability-system-full.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
//console.log(process.env.SAFEPAY_API);
const server = http.createServer(app)
InitializeSocket(server)
app.use(parser())
app.use(express.json())
app.use(
  session({
    secret: "amas_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000, 
    },
  })
);
app.use('/' , AuthRoute)
app.use('/' , User)
app.use('/' , PharmacyRoutes)
app.use('/' , AdminRole)
app.use("/", uploadRoute);
app.use('/' , ChatRoute)
app.use('/' , Paymentrouter)


DBConnection().then(()=>{
    console.log('DB Connect Success');
    server.listen(3000,()=>{
    console.log('Server is Running');
})
}).catch((err)=>{
    console.log(err || " DB Connection is not eastablished");
})

