const express = require('express')
const PharmacyForm = require('../../controllers/Pharmacy/form')
const ValidateToken = require('../../middleware/ValidationToken')
const RoleCheck = require('../../middleware/RolePharmacy')
const UserStatus = require('../../controllers/Pharmacy/userStatus')
const PharmacyRequests = require('../../controllers/Pharmacy/userStatus')


const PharmacyRoutes = express.Router()


PharmacyRoutes.post('/form/create' ,ValidateToken ,RoleCheck , PharmacyForm)
PharmacyRoutes.get('/CheckAvalibility' , ValidateToken  , RoleCheck , PharmacyRequests )



module.exports = PharmacyRoutes


