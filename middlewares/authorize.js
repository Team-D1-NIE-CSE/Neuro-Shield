const jwt = require('jsonwebtoken');
const userModel = require('../utils/models/user')

module.exports.authorize = async (req, res, next) => {
    if (req.cookies.khataToken) {
        try {
            const data = await jwt.verify(req.cookies.khataToken, process.env.JWT_SECRET);
            req.user = await userModel.findOne({ email: data.email }).select('-password'); // do not save password
            console.log(req.user)
            console.log("Authorized with middleware.")
            next();
        } catch (err) {
            res.status(401).send("Something went wrong!")
        }
    } else {
        res.send("Not Authorized.")
    }
}