var nodemailer = require('nodemailer');
function announcement(to,subject,body) {
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
        subject: subject,
        text: body
    };    
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('announcement sent: ' + info.response);
            }
        });
   

   
}
module.exports = announcement