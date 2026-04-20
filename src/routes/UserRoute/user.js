const express = require('express')
const RequestTablet = require('../../controllers/user/searchtab')


const User = express.Router()


User.post('/userRequest' , RequestTablet)



module.exports = User