const express = require('express')
const AuthControllers = require('../../controllers/AuthControllers/UserAuthController')
const VerifyMail = require('../../controllers/AuthControllers/VerifyMail')
const Login = require('../../controllers/AuthControllers/login')

const AuthRoute = express.Router()


AuthRoute.post('/signup' ,AuthControllers)
AuthRoute.post('/Verifyemail' , VerifyMail)
AuthRoute.post('/login' , Login)



module.exports = AuthRoute