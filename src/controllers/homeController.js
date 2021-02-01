const dotenv = require('dotenv').config().parsed
const fetch = require('node-fetch')
let message = true

module.exports = {
    handleContactForm: async function(req, res){
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: dotenv.FORM_ACCOUNT,
                pass: dotenv.FORM_PASSWD
            }
        });

        let name = req.body.inputName
        let firstName = req.body.inputFirstName
        let email = req.body.inputEmail
        let subject = req.body.inputSubject
        let content = req.body.inputBodyMail
        let captcha = req.body['g-recaptcha-response']
        const secretKey = dotenv.API_CAPTCHA_KEY
        const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + captcha

        const mailOptions = {
            from: email,
            to: dotenv.FORM_MAIL,
            subject: subject,
            text: "De la part de " + name + " " + firstName + "\n" +  content,
            replyTo: email
        };

        this.redirectToContact(res, message, transporter, mailOptions, verificationUrl)
    },

    checkCaptchaURL: async function(transporter, mailOptions, verificationUrl){
        return await fetch(verificationUrl)
            .then(res => res.json())
            .then(body => {
                if(body.success !== undefined && !body.success) {
                    message = false
                    throw new Error("Captcha error")
                } else {
                    transporter.sendMail(mailOptions, function(error){
                        if (!error) {
                            message = false
                            throw new Error("Mail error")
                        } else {
                            console.log(error)
                        }
                    })
                }
            })
            .catch(err => console.log(err))
    },

    redirectToContact: async function(res, transporter, mailOptions, verificationUrl){
        await this.checkCaptchaURL(transporter, mailOptions, verificationUrl)
        res.render('default', {
            title:  'Accueil',
            description: 'Bienvenue sur le Portfolio de Benjamin Catouillard',
            message: message,
            anchor: "contact"
        })
    }
}