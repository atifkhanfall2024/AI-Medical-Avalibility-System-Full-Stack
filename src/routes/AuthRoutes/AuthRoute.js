const express = require('express')
const AuthControllers = require('../../controllers/AuthControllers/UserAuthController')
const VerifyMail = require('../../controllers/AuthControllers/VerifyMail')
const Login = require('../../controllers/AuthControllers/login')
const ResendOtp = require('../../controllers/AuthControllers/Resendotp')
const Me = require('../../controllers/AuthControllers/me')
const Logout = require('../../controllers/AuthControllers/logout')
const upload = require('../../utils/multer')

const AuthRoute = express.Router()


AuthRoute.post('/signup' ,upload.fields([
  { name: "Photo", maxCount: 1 },
  { name: "License", maxCount: 1 }
]) , AuthControllers)
AuthRoute.post('/Verifyemail' , VerifyMail)
AuthRoute.post('/login' , Login)
AuthRoute.post('/resendotp' , ResendOtp)
AuthRoute.get('/me' , Me)
AuthRoute.post('/logout' , Logout)

module.exports = AuthRoute