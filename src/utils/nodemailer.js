const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "email",
    auth: {
        user: "grigor.martirosyan2000@mail.ru",
        pass: "barc123123"
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter