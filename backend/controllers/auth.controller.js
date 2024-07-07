const authService = require('../services/auth.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secretKey } = require('../config/jwt.config')
const User = require('../models/user.model')
// const {sendSuccessResponse} = require('../utils/response.util')

const register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body
    const user = await User.findOne({ email })

    if (user) {
      return res.status(409).json({ message: 'Email Sudah Ada!, Gunakan Email Lain!' })
    }

    const response = await authService.register(email, password, username, role)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'Registrasi gagal!' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Email Salah!' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Password Salah!' })
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Email belum diverifikasi!' })
    }

    const data = {
      _id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    }
    const tokenUser = await authService.login(data)

    res.status(200).json({
      message: 'Login Berhasil Yeyy!',
      user: data,
      token: tokenUser.token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Terjadi Kesalahan Server!' })
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params
    const decodedToken = jwt.verify(token, secretKey)
    const userId = decodedToken.userId

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: 'Email has already been verified.' })
    }

    user.isVerified = true
    await user.save()

    res.json({ message: 'Email successfully verified.' })
  } catch (error) {
    res.status(500).json({ message: 'Verification failed.' })
  }
}

module.exports = { register, login, verifyEmail }
