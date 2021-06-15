const nodemailer = require('nodemailer')

function sendMail(to,otp) {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user : "virtualsant@gmail.com",
            pass : "wwybepzieenziltg"
        }
    })
    const str = 'your otp = '+ otp
    console.log(otp)

    const mailOption = {
        from : "virtualsant@gmail.com",
        to: to,
        subject : "reset password otp",
        text : str
    }

    transporter.sendMail(mailOption, (err,info) => {
        if(err) 
        {   
            console.log(err)
            console.log('---------------------------------')
        }
        else console.log(info.response);
    })
}

module.exports = sendMail