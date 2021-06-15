var nodemailer = require('nodemailer');
var schedule=require('node-schedule');

function deadlineEmail(to,deadline,msg) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saurabhbiswas1600@gmail.com',
            pass: 'qnmwzezxzxchjyix'
        }
    });
    var mailOptions = {
        from: 'saurabhbiswas1600@gmail.com',
        to: to,
        // cc:cc,
        subject: 'Deadline remainder',
        text: msg
    };    
   var deadlineDate=new Date(deadline);
    var textDate=deadlineDate.getMinutes()+" "+deadlineDate.getHours()+" "+(parseInt(deadlineDate.getDate())-1)+" "+(parseInt(deadlineDate.getMonth())+1)+" *"; 
    var finaldeadline=textDate.toString();
    console.log(finaldeadline);
    schedule.scheduleJob(finaldeadline,()=>{
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Deadline sent: ' + info.response);
            }
        });
    })

   
}
module.exports = deadlineEmail