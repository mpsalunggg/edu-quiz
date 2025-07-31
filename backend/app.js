const express = require('express')
const app = express()
const cors = require('cors')
const port = 4444
const mongooseConfig = require('./config/db.config')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const quizRoutes = require('./routes/quiz.route')
const studentAnswerRoutes = require('./routes/studentAnswer.route')

app.use(express.json())

app.use(cors())
app.get('/', (_, res) => {
  return res.json({
    hi: 'hellooooo',
  })
})
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/quiz', quizRoutes)
app.use('/student-answer', studentAnswerRoutes)

mongooseConfig()
app.listen(port, () => {
  console.log('Server berjalan di http://localhost:' + port)
})
