const nodemailer = require('nodemailer')

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    secure: true,
    auth: {
      user: 'putrasatria.akun4@gmail.com',
      pass: 'anhmwqlzkmwuazmi',
    },
  })


  const mailOptions = {
    from: 'putrasatria.akun4@gmail.com',
    to: email,
    subject: 'Verifikasi Email',
    // html: `<p>Silakan klik <a href="http://localhost:4444/verify/${encodeURIComponent(encodeURIComponent(token))}">tautan ini</a> untuk verifikasi email.</p>`,
    html: `<p>Silakan klik <a href="http://localhost:5173/verification?token=${token}">tautan ini</a> untuk verifikasi email.</p>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = { sendVerificationEmail }
