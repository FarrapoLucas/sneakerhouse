const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
 service: 'gmail',
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_PASS
 }
});

const sendEmail = (to, subject, text) => {
 const mailOptions = {
 from: process.env.EMAIL_USER,
 to,
 subject,
 text
 };

 transporter.sendMail(mailOptions, (error, info) => {
 if (error) {
 return console.log('Erro ao enviar e-mail:', error);
 }
 console.log('E-mail enviado:', info.response);
 });
};

module.exports = { sendEmail };