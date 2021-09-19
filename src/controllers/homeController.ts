import dotenv from 'dotenv';
import fetch from 'node-fetch';
const privateEnv = dotenv.config().parsed;
let message = true

export const handleContactForm = async (req, res) => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: privateEnv.FORM_ACCOUNT,
            pass: privateEnv.FORM_PASSWD
        }
    });

    let name = req.body.inputName
    let firstName = req.body.inputFirstName
    let email = req.body.inputEmail
    let subject = req.body.inputSubject
    let content = req.body.inputBodyMail
    let captcha = req.body['g-recaptcha-response']
    const secretKey = privateEnv.API_CAPTCHA_KEY
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + captcha

    const mailOptions = {
        from: email,
        to: privateEnv.FORM_MAIL,
        subject: subject,
        text: "De la part de " + name + " " + firstName + "\n" +  content,
        replyTo: email
    };

    redirectToContact(res, transporter, mailOptions, verificationUrl)
}

const checkCaptchaURL = async (transporter, mailOptions, verificationUrl) =>{
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
}

const redirectToContact = async (res, transporter, mailOptions, verificationUrl) => {
    await checkCaptchaURL(transporter, mailOptions, verificationUrl)
    res.render('default', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard',
        message: message,
        anchor: "contact"
    })
}