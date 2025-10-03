const express = require("express");

const testRouter = express.Router()

const { testController } = require('../controllers/test-controller')

testRouter.post('/', testController)

module.exports = testRouter