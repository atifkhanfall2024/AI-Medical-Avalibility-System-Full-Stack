const express = require("express");
const ValidateToken = require("../../middleware/ValidationToken");
const GetChats = require("../../controllers/chats/GetChats");

const ChatRoute = express.Router()


ChatRoute.get('/getchats/:id' ,ValidateToken , GetChats)



module.exports = ChatRoute