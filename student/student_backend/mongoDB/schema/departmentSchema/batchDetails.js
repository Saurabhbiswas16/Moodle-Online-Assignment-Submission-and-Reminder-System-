const mongoose=require('mongoose');

const batchSchema=mongoose.Schema({
    batch:String,
    divID:String  
})

const batche=mongoose.model('batches',batchSchema);
module.exports =batche;