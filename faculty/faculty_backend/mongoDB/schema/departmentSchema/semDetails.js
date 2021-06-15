const mongoose=require('mongoose');

const semSchema=mongoose.Schema({
    sem:String,
    deptID:String  
})

const semester=mongoose.model('semesters',semSchema);
module.exports =semester;