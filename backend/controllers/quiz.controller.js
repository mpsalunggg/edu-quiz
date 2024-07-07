const quizService = require('../services/quiz.service')
const Quiz = require('../models/quiz.model')
const mongoose = require('mongoose')
const { fisherYatesShuffle } = require('../utils/fisherYatesShuffle.util')

exports.createQuiz = async (req, res) => {
  try {
    const savedQuiz = await quizService.createQuiz(req.body)
    res.status(201).json(savedQuiz)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'id_author',
          foreignField: '_id',
          as: 'author',
        },
      },
    ])

    if (!quizzes) {
      return res.status(404).json({ message: 'No quizzes found.' })
    }

    const modifiedQuizzes = quizzes.map((quiz) => {
      const { questions, ...rest } = quiz
      const modifiedQuestions = questions.map((question) => {
        const { jawabanbenar, ...rest } = question
        return rest
      })

      return { ...rest, questions: modifiedQuestions }
    })

    res.status(200).json(modifiedQuizzes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id)
    if (!quiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }
    res.status(200).json(quiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateQuiz = async (req, res) => {
  try {
    const updatedQuiz = await quizService.updateQuiz(req.params.id, req.body)
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }
    res.status(200).json({ message: 'Berhasil Perbarui Quiz!', updatedQuiz })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await quizService.deleteQuiz(req.params.id)
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }
    res.status(200).json({ message: 'Berhasil menghapus Quiz!', deletedQuiz })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllQuizzWithUser = async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([
      {
        $match: {
          id_author: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'id_author',
          foreignField: '_id',
          as: 'author',
        },
      },
    ])
    console.log(123213, req.userId)
    if (!quizzes) {
      return res.status(404).json({ message: 'No quizzes found.' })
    }

    const modifiedQuizzes = quizzes.map((quiz) => {
      const { questions, ...rest } = quiz
      const modifiedQuestions = questions.map((question) => {
        const { jawabanbenar, ...rest } = question
        return rest
      })

      return { ...rest, questions: modifiedQuestions }
    })

    res.status(200).json(modifiedQuizzes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.createQuestion = async (req, res) => {
  try {
    const quizId = req.params.id
    const { pertanyaan, options, jawabanbenar } = req.body

    const quiz = await Quiz.findById(quizId)

    if (!quiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }

    const newQuestion = {
      pertanyaan,
      options,
      jawabanbenar,
    }

    quiz.questions.push(newQuestion)

    const result = await quiz.save()

    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan saat membuat pertanyaan' })
  }
}

exports.updateQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId
    const questionId = req.params.questionId
    const updatedQuestionData = req.body

    const existingQuiz = await quizService.getQuizById(quizId)

    if (!existingQuiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan!' })
    }

    const updatedQuiz = await quizService.updateQuestionInQuiz(
      existingQuiz,
      questionId,
      updatedQuestionData
    )

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Pertanyaan tidak ditemukan!' })
    }

    res.status(200).json(updatedQuiz)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId
    const questionId = req.params.questionId

    const existingQuiz = await quizService.getQuizById(quizId)

    if (!existingQuiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }

    const deletedQuestion = await quizService.deleteQuestionInQuiz(
      existingQuiz,
      questionId
    )

    if (!deletedQuestion) {
      return res
        .status(404)
        .json({ message: 'Pertanyaan tidak ditemukan dalam kuis' })
    }

    res
      .status(201)
      .json({ message: 'Berhasil menghapus pertanyaan!', deletedQuestion })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getQuestionById = async (req, res) => {
  try {
    const quizId = req.params.quizId
    const questionId = req.params.questionId

    const existingQuiz = await quizService.getQuizById(quizId)

    if (!existingQuiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan' })
    }

    const question = await quizService.getQuestionById(existingQuiz, questionId)

    if (!question) {
      return res.status(404).json({ message: 'Pertanyaan tidak ditemukan' })
    }

    res.status(200).json(question)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getQuizByIdWithoutCorrectAnswer = async (req, res) => {
  try {
    const { quizId } = req.params

    const quiz = await Quiz.findById(quizId).select('-questions.jawabanbenar')

    if (!quiz) {
      return res.status(404).json({ message: 'Kuis tidak ditemukan.' })
    }

    const shuffledQuiz = {
      ...quiz.toJSON(),
      questions: fisherYatesShuffle([...quiz.toJSON().questions]),
    }

    shuffledQuiz.questions = shuffledQuiz.questions.map((question) => ({
      ...question,
      options: fisherYatesShuffle([...question.options]),
    }))

    res.status(200).json(shuffledQuiz)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil kuis.' })
  }
}

exports.getQuizByTeacher = async (req, res) => {
  const { teacherId } = req.params
  try {
    const quiz = await Quiz.find({ id_author: teacherId }).select(
      '-questions.jawabanbenar'
    )

    res.status(200).json(quiz)
  } catch (err) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}
