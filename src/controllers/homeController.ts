import dotenv from 'dotenv';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
const privateEnv = dotenv.config().parsed;

export const handleContactForm = (req, res) => {
    let showMessage = true;
    const { inputName, inputFirstName, inputEmail, inputSubject, inputBodyMail } = req.body;
    const captcha = req.body['g-recaptcha-response'];
    const secretKey = privateEnv.API_CAPTCHA_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: privateEnv.FORM_ACCOUNT,
            pass: privateEnv.FORM_PASSWD
        }
    });
    const mailOptions = {
        from: inputEmail,
        to: privateEnv.FORM_MAIL,
        subject: inputSubject,
        text: `De la part de ${inputName} ${inputFirstName} \n ${inputBodyMail}`,
        replyTo: inputEmail
    };

    redirectToContact(res, transporter, mailOptions, verificationUrl, showMessage);
}

const checkCaptchaURL = (transporter, mailOptions, verificationUrl: string, showMessage: boolean) =>{
    try {
        return fetch(verificationUrl)
            .then(res => res.json())
            .then(body => {
                if(body.success) {
                    transporter.sendMail(mailOptions, function(error){
                        if (!error) {
                            showMessage = false;
                            throw new Error("Mail error");
                        } else {
                            console.log(error);
                        }
                    });
                } else {
                    showMessage = false;
                    throw new Error("Captcha error");
                }
            })
            .catch(err => console.log(err));
    } catch (error) {
        console.error(error);
    }
}

const redirectToContact = (res, transporter, mailOptions, verificationUrl: string, showMessage: boolean) => {
    checkCaptchaURL(transporter, mailOptions, verificationUrl, showMessage)
    res.render('default', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard',
        showMessage: showMessage,
        anchor: "contact"
    });
}