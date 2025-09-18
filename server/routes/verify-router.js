const  verifyCertificate  = require("../middlewares/verify-certificate");
const  verifyCertificateMock  = require("../middlewares/verify-certificate-mock");
const express = require("express");

const verifyRouter = express.Router()

const { verifyController } = require('../controllers/verify-controller')

verifyRouter.get('/', verifyCertificateMock, verifyController)
verifyRouter.post('/', verifyCertificate, verifyController)

module.exports = verifyRouter
