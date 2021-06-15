const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
// const JOI = require('@hapi/joi')

const studentSchema = new schema({
    id : {
        type: String,
        lowercase: true,
        default: '18ceusg093'
        // unique: true
    },
    fname:{
        type: String,
        lowercase: true,
    },
    mname:{
        type: String,
        lowercase: true,
    },
    lname:{
        type: String,
        lowercase: true,
    },
    departmentId:{
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    semesterId:{
        type: String,
        lowercase: true,
    },
    dob:{
        lowercase: true,
        type:Date
    },
    password: {
        type: String,
    },
    verified:{
        type: Boolean,
        default: false
    },
    divisionId:{
        type: String,
        default: ""
    },
    batchId:{
        type: String,
        default: ""
    },
    rollNo:{
        type: Number,
        default: 0
    },



})

//middleware to encrypt the password
studentSchema.pre('save', async function (next) {
    try {


        // console.log("before saving the user")
        const salt = await bcrypt.genSalt(10)
        const hasPass = await bcrypt.hash(this.password, salt)
        // const salt = await bcrypt.genSaltSync(10)
        // const hasPass = await bcrypt.hashSync(pass,salt)
        this.password = hasPass

        next()
    } catch (error) {
        next(error)
    }
})

studentSchema.pre('updateOne' ,async function (next){
    try {
        console.log("hello from heaven")
        const pass = this.getUpdate().$set.password
        if (!pass) return next();
        console.log(pass)

        // const salt = await bcrypt.genSaltSync(10)
        // const hasPass = await bcrypt.hashSync(pass,salt)

        const salt = await bcrypt.genSalt(10)
        const hasPass = await bcrypt.hash(pass, salt)
        this.getUpdate().$set.password = hasPass;
        next()
    } catch (error) {
        console.log("hello from hell")
        next(error)
    }

})



studentSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)

    } catch (error) {
        throw error
    }
}

const User = mongoose.model('students', studentSchema)
module.exports = User