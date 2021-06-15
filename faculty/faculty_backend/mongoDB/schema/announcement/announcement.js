const mongoose=require('mongoose');

const announcementSchema=mongoose.Schema({
    departmentId:String,
    semesterId:String,
    divisionId:String,
    batchId:String,
    sendMailID:String,
    sendMailName:String,
    subject:String,
    email_body:String
})

const announcements=mongoose.model('announcements',announcementSchema);
module.exports =announcements;