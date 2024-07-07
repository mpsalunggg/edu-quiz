const mongoose = require('mongoose')

const studentAnswerSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz.questions',
        required: true,
      },
      selectedAnswer: String,
      isCorrect: Boolean,
    },
  ],
  totalCorrectAnswers: Number,
  totalIncorrectAnswers: Number,
  score: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

const StudentAnswer = mongoose.model('StudentAnswer', studentAnswerSchema)

module.exports = StudentAnswer
