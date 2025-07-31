const mongoose = require('mongoose')
require('dotenv').config()

// const db = 'mongodb://localhost:2111/logintes'
const db = process.env.MONGO_DB

const mongooseConfig = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database Connected')
  } catch (err) {
    console.log('Error Connecting', err)
  }
}

module.exports = mongooseConfig
