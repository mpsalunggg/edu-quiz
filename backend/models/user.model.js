const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  isVerified: { type: Boolean, default: false },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const User = mongoose.model('User', userSchema)

module.exports = User
