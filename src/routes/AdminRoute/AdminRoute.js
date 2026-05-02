const express = require('express')
const ValidateToken = require('../../middleware/ValidationToken')
const AdminRoleCheck = require('../../middleware/AdminRole')
const AdminCheckStatus = require('../../controllers/Admin/CheckStatus')
const ApprovedReject = require('../../controllers/Admin/ApproveReject')
const GetAdminCheckStatus = require('../../controllers/Admin/GetAdmins')

const AdminRole = express.Router()



AdminRole.get('/getPharmacy' , ValidateToken ,AdminRoleCheck , AdminCheckStatus )
AdminRole.post('/change/status' , ValidateToken , AdminRoleCheck , ApprovedReject )
AdminRole.get('/getadmins' ,ValidateToken , AdminRoleCheck , GetAdminCheckStatus )



module.exports = AdminRole