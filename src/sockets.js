
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
                socketid: socket.id
            });
        });

        socket.on("verify-verification-code", (mail, code) => {

            if (verifyVerificationCode(code, mail)) {
                status = true; // the state is successful
                emitVerificationMessage(code, mail, socket.id, status);
            } else {
                emitVerificationMessage(code, mail, socket.id, false);
            }

        });

    });

    function emitVerificationMessage(code,mail, socketid, status) {
        io.sockets.socket(socketid).emit("verification-message", { mail: mail, status: status });
    }


}

// CODE AND EMAIL LOGIC:

// all verification codes:
let allCodes = [];

function createVerificationCode() {
    let code;
    do {
        code = Math.round(Math.random() * 999999);  // 6 digits
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

function verifyVerificationCode(code, mail) {
    for (const elem of allCodes) {
        if (elem.code === code && elem.mail === mail) return true;
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
        // html: "<b>Hello world?</b>", // html body (example)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

