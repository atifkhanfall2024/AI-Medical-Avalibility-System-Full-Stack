const express = require('express')
const ValidateToken = require('../../middleware/ValidationToken')
const AdminRoleCheck = require('../../middleware/AdminRole')
const AdminCheckStatus = require('../../controllers/Admin/CheckStatus')
const ApprovedReject = require('../../controllers/Admin/ApproveReject')

const AdminRole = express.Router()



AdminRole.get('/getUsers' , ValidateToken ,AdminRoleCheck , AdminCheckStatus )
AdminRole.post('/change/status' , ValidateToken , AdminRoleCheck , ApprovedReject )




module.exports = AdminRole