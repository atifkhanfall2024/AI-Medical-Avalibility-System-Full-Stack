const express = require('express')
const DBConnection = require('./lib/db')
const AuthRoute = require('./routes/AuthRoutes/AuthRoute')
const session   = require('express-session')
const User = require('./routes/UserRoute/user')
const parser = require('cookie-parser')
const PharmacyRoutes = require('./routes/Pharmacy/PharmacyRoutes')
const AdminRole = require('./routes/AdminRoute/AdminRoute')
const app = express()
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

DBConnection().then(()=>{
    console.log('DB Connect Success');
    app.listen(3000,()=>{
    console.log('Server is Running');
})
}).catch((err)=>{
    console.log(err || " DB Connection is not eastablished");
})

