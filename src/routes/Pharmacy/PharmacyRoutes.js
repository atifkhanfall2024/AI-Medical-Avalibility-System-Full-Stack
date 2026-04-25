const express = require('express')
const PharmacyForm = require('../../controllers/Pharmacy/form')
const ValidateToken = require('../../middleware/ValidationToken')
const RoleCheck = require('../../middleware/RolePharmacy')
const UserStatus = require('../../controllers/Pharmacy/userStatus')
const PharmacyRequests = require('../../controllers/Pharmacy/userStatus')
const SetStatus = require('../../controllers/Pharmacy/setStatus')


const PharmacyRoutes = express.Router()


PharmacyRoutes.post('/form/create' ,ValidateToken ,RoleCheck , PharmacyForm)
PharmacyRoutes.get('/CheckAvalibility' , ValidateToken  , RoleCheck , PharmacyRequests )
PharmacyRoutes.post('/ChangeStatus/:id/:status' , ValidateToken , RoleCheck , SetStatus )


module.exports = PharmacyRoutes


