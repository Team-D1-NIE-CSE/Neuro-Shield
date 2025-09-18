const  verifyCertificate  = require("../middlewares/verify-certificate");
const express = require("express");

const verifyRouter = express.Router()

const { verifyController } = require('../controllers/verify-controller')

verifyRouter.get('/', verifyCertificate, verifyController)

module.exports = verifyRouter
