const express = require('express')
const DBConnection = require('./lib/db')
const AuthRoute = require('./routes/AuthRoutes/AuthRoute')
const session   = require('express-session')
const app = express()
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

DBConnection().then(()=>{
    console.log('DB Connect Success');
    app.listen(3000,()=>{
    console.log('Server is Running');
})
}).catch((err)=>{
    console.log(err || " DB Connection is not eastablished");
})

