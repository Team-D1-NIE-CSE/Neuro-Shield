// models/user.js
const mongoose = require("mongoose");
const hisaabSchema = require("./hisaab");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hisaabs: [hisaabSchema]
});

module.exports = mongoose.model("User", userSchema);
