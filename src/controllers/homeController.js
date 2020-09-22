const dotenv = require('dotenv').config().parsed

module.exports = {
    handleContactForm: function(req) {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: dotenv.FORM_ACCOUNT,
                pass: dotenv.FORM_PASSWD2
            }
        });

        let name = req.body.inputName
        let firstName = req.body.inputFirstName
        let email = req.body.inputEmail
        let subject = req.body.inputSubject
        let content = req.body.inputBodyMail
        let captcha = req.body['g-recaptcha-response']
        const secretKey = dotenv.API_CAPTCHA_KEY
        const verificatioUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + captcha


        const mailOptions = {
            from: email,
            to: dotenv.FORM_MAIL,
            subject: subject,
            text: "De la part de " + name + " " + firstName + "\n" +  content,
            replyTo: email
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error)
            } else {
                console.log(info)
            }
        });
    }
}