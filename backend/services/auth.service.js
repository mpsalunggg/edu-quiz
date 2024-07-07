const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sendVerificationEmail } = require('../utils/email.util')
const User = require('../models/user.model')
const { secretKey } = require('../config/jwt.config')
// const { sendSuccessResponse, send } = require('../utils/response.util')

const register = async (email, password, username, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role ? role : 'student',
    })

    const savedUser = await user.save()

    const verificationToken = jwt.sign({ userId: savedUser._id }, secretKey, {
      expiresIn: '1d',
    })

    sendVerificationEmail(savedUser.email, verificationToken)

    return {
      message: 'Registrasi berhasil. Silakan Cek Email Anda Untuk Verifikasi!',
    }
  } catch (error) {
    throw new Error('Registrasi gagal.')
  }
}

const login = async (user) => {
  console.log(user)
  try {
    const authToken = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1d',
    })

    return { user, token: authToken }
  } catch (error) {
    throw new Error('Terjadi Kesalahan Server!')
  }
}

module.exports = { register, login }
