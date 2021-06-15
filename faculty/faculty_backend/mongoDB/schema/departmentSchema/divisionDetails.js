const mongoose=require('mongoose');

const divisionSchema=mongoose.Schema({
    div:String,
    semID:String  
})

const division=mongoose.model('divisions',divisionSchema);
module.exports =division;