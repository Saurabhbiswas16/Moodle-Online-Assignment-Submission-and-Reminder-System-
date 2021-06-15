var nodemailer = require('nodemailer');
function newAssignmentEmail(to,msg) {
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
        subject: 'New Assignment Uploaded',
        text: msg
    };    
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('newAssignmentEmail sent: ' + info.response);
            }
        });
   

   
}
module.exports = newAssignmentEmail