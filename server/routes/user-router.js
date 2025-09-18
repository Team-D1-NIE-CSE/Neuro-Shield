const getUsername = require("../middlewares/get-username");
const express = require("express");

const userRouter = express.Router()

const { userController } = require('../controllers/user-controller')

userRouter.get('/', getUsername, userController)

module.exports = userRouter
