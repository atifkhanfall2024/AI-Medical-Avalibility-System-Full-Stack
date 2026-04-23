const express = require('express')
const PharmacyForm = require('../../controllers/Pharmacy/form')
const ValidateToken = require('../../middleware/ValidationToken')
const RoleCheck = require('../../middleware/RolePharmacy')


const PharmacyRoutes = express.Router()


PharmacyRoutes.post('/form/create' ,ValidateToken ,RoleCheck , PharmacyForm)




module.exports = PharmacyRoutes


