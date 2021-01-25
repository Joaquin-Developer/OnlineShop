const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

module.exports = function(io) {

    io.on("connection", async (socket) => {

        socket.on("request-verification-code", (mail) => {
            console.log(socket.id + " requirió un código de verificación para registro");
            
            const code = createVerificationCode();
            // send mail
            sendEmail(mail, code);

            // save code-verification:
            allCodes.push({
                code: code,
                mail: mail,
                id: socket.id
            });

        });

    });

} // end module.exports

// CODE AND EMAIL LOGIC:

// todos los códigos de verificación sin remitir
let allCodes = [];

function createVerificationCode() {
    // creo un numero random de 6 digitos y lo retorno:
    let code;
    do {
        code = Math.round(Math.random() * 999999);
    } while(searchCodeInArray(code) === false);

    return code;
}

function searchCodeInArray(code) {
    // return true if the code belongs to the array
    /**
     * Optimizar esta función
     * mas adelante implementar busqueda binaria (los códigos deberían estar ordenados)...
     */
    if (allCodes.length === 0) return false;

    for (const elem of allCodes) {
        if (elem.code === code) return true;
    }
    return false;
}

function sendEmail(to, code) {

    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.SEND_EMAIL_MAIL,
            pass: process.env.SEND_EMAIL_PASSWORD
        }
    }));


    const mailOptions = {
        from: process.env.SEND_EMAIL_MAIL,
        to: to,
        subject: "Verification code - OnlineShop",
        text: "The verification code from OnlineShop account is: " + code //, plain text body
        // html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

