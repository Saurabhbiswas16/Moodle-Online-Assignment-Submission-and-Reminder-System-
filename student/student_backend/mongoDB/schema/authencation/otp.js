const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
otpSchema = new Schema ({
    otp:String,
    email : String
})

const otp = mongoose.model("otp",otpSchema)
module.exports = otp;