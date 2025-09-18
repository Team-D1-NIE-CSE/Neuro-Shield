const express = require("express");

const testRouter = express.Router()

const { testController } = require('../controllers/test-controller')

testRouter.get('/', testController)

module.exports = testRouter