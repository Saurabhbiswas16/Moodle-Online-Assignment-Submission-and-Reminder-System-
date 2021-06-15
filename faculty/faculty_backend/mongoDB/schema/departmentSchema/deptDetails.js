const mongoose=require('mongoose');

const deptSchema=mongoose.Schema({
    deptName:String,  
})

const department=mongoose.model('departments',deptSchema);
module.exports =department;