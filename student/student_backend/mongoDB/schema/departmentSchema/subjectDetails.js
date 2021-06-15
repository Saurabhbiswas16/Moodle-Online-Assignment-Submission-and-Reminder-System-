const mongoose=require('mongoose');

const subjectSchema=mongoose.Schema({
    subject:String,
    semID:String  
})

const subject=mongoose.model('subjects',subjectSchema);
module.exports =subject;