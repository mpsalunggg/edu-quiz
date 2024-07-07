const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
  value: String,
})

const questionSchema = new mongoose.Schema({
  pertanyaan: String,
  options: [optionSchema],
  jawabanbenar: String,
})

const quizSchema = new mongoose.Schema({
  title: String,
  totalQuestionsForStudents: Number,
  description: String,
  thumb_quiz: String,
  questions: [questionSchema],
  timer: Number,
  status: Boolean,
  id_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz
