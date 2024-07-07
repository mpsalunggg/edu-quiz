const mongoose = require('mongoose')

const db = 'mongodb://localhost:2111/logintes'
// const db =
//   'mongodb+srv://eduquiz:lnRCAWRU0xT6ydVx@cluster0.7bdauyc.mongodb.net/?retryWrites=true&w=majority'

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
