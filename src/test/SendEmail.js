
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

(() => {

    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "joaquin77j@gmail.com", // process.env.SEND_EMAIL_MAIL,
            pass: "jparrilla77j" // process.env.SEND_EMAIL_PASSWORD
        }
    }));

    // let transporter = nodemailer.createTransport({
    //     //host: "smtp.gmail.com",
    //     //port: 465,
    //     //secure: true, // true for 465, false for other ports
    //     service: "gmail",
    //     auth: {
    //         user: "joaquin77j@gmail.com", // process.env.SEND_EMAIL_MAIL,
    //         pass: "jparrilla77j" // process.env.SEND_EMAIL_PASSWORD
    //     }
    // });

    const mailOptions = {
        from: "joaquin77j@gmail.com", //process.env.SEND_EMAIL_MAIL, // sender address
        to: "joaquin.p.olivera@gmail.com", // list of receivers
        subject: "Test", // Subject line
        text: "This is a nodemailer test!" //, plain text body
        // html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})();

