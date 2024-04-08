import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS
    }
});

const mailUser = (receiverMail, subject, message) => {
    const mailOptions = {
        from: process.env.MAIL,
        to: receiverMail,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export { mailUser };