const express = require('express')
const RequestTablet = require('../../controllers/user/searchtab')
const ValidateToken = require('../../middleware/ValidationToken')


const User = express.Router()


User.post('/userRequest' , ValidateToken , RequestTablet)



module.exports = User