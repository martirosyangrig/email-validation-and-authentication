const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 587,
    secure: false,
    auth: {
        user: "grigor.martirosyan2000@mail.ru",
        pass: "BsE3MTMTZWhgdLXa6GMZ"
    }
});

async function sendEmail(newUser, url) {
    await transporter.sendMail({
        from: "grigor.martirosyan2000@mail.ru",
        to: newUser.email,
        subject: "Confirm email",
        html: `Please click this link: <a href="${url}">comfirm</a>`
    });
}

module.exports = { transporter, sendEmail }