const bcrypt = require('bcrypt');

const userModel = require('../utils/models/user')
const getToken = require('../utils/services/get-token')


// signup
module.exports.signupUser = async function (req, res) {
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            console.log('User already exists.');
            return res.send("User already exists. Kindly login.");
        }

        // create new user
        // generate hash using bcrypt
        const salt = await bcrypt.genSalt(+process.env.MY_SALT); // unnary + operator to convert string to integer
        const hash = await bcrypt.hash(password, salt)
        user = await userModel.create({
            name,
            email,
            password: hash
        })
        console.log("user Created.")
        // now login the user by saving jwt token
        let token = getToken({ email })
        res.cookie('khataToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // one day
        })
        console.log("Cookie is set.")

        res.status(201).send(user);
    }
    catch (err) {
        console.log("Here is the err: ", err.message);
        res.status(500).send("Process Failure, please go back!")
    }
}


// login
module.exports.loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send("Invalid email or password.")
        }
        let result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(500).send("Invalid email or password.")
        }

        // now login the user by saving jwt token
        let token = getToken({ email })
        res.cookie('khataToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // one day
        })
        console.log("Cookie is set.")
        console.log("Logged In.")

        res.status(201).send("Logged in Successfully.");
    }
    catch {
        console.log("Cannot get user data!");
        res.send("Process Failure, please go back!")
    }
}


// user profile
module.exports.userProfile = function (req, res) {
    let { name, email, hisaabs } = req.user;
    res.json({name, email, hisaabs});
}

// logout
module.exports.logoutUser = function (req, res) {
    res.cookie('khataToken', '', {
        httpOnly: true,
        secure: true,
    })
    console.log("Cookie is reset.")

    res.status(201).send("Logged Out.");
}