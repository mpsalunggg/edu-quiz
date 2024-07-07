const Quiz = require('../models/quiz.model')

// Membuat kuis baru
exports.createQuiz = async (quizData) => {
  try {
    const newQuiz = new Quiz(quizData)
    const savedQuiz = await newQuiz.save()
    return savedQuiz
  } catch (error) {
    throw error
  }
}

// Mendapatkan semua kuis
exports.getAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find().select('-questions.jawabanbenar')
    return quizzes
  } catch (error) {
    throw error
  }
}

// Mendapatkan kuis berdasarkan ID
exports.getQuizById = async (quizId) => {
  try {
    const quiz = await Quiz.findById(quizId)
    return quiz
  } catch (error) {
    throw error
  }
}

// Memperbarui kuis berdasarkan ID
exports.updateQuiz = async (quizId, quizData) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, quizData, {
      new: true,
    })
    return updatedQuiz
  } catch (error) {
    throw error
  }
}

// Menghapus kuis berdasarkan ID
exports.deleteQuiz = async (quizId) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndRemove(quizId)
    return deletedQuiz
  } catch (error) {
    throw error
  }
}

exports.updateQuestionInQuiz = async (
  quiz,
  questionId,
  updatedQuestionData
) => {
  try {
    const questionIndex = quiz.questions.findIndex(
      (question) => question._id.toString() === questionId
    )

    if (questionIndex === -1) {
      return false
    }

    quiz.questions[questionIndex] = {
      ...quiz.questions[questionIndex],
      ...updatedQuestionData,
    }

    const updatedQuiz = await quiz.save()

    return updatedQuiz
  } catch (error) {
    throw error
  }
}

exports.deleteQuestionInQuiz = async (quiz, questionId) => {
  try {
    const questionIndex = quiz.questions.findIndex(
      (question) => question._id.toString() === questionId
    )

    if (questionIndex === -1) {
      return false 
    }

    quiz.questions.splice(questionIndex, 1)

    const deleteQuestion = await quiz.save()

    return deleteQuestion
  } catch (error) {
    throw error
  }
}

exports.getQuestionById = async (quiz, questionId) => {
  try {
    const question = quiz.questions.find((q) => q._id.toString() === questionId)

    if (!question) {
      return false
    }

    return question
  } catch (error) {
    throw error
  }
}