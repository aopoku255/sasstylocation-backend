const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    address: String,
    location: {},
    select: String,
    working: String,
    referral: String,
    number: String,
});

module.exports = mongoose.model("users", userSchema);