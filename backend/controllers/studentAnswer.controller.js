const StudentAnswer = require('../models/studentAnswer.model')
const Quiz = require('../models/quiz.model')
const mongoose = require('mongoose')
const User = require('../models/user.model')

exports.createStudentAnswer = async (req, res) => {
  try {
    const { studentId, answers, idQuestions } = req.body
    const { quizId } = req.params

    const dataquiz = await Quiz.findById(quizId)

    const objectIdQuestions = idQuestions.map(
      (id) => new mongoose.Types.ObjectId(id)
    )

    // const selectedQuestions = await Quiz.findOne({
    //   _id: quizId,
    //   questions: { $elemMatch: { _id: { $in: objectIdQuestions } } },
    // })

    const selectedQuestions = await Quiz.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
      {
        $project: {
          questions: {
            $filter: {
              input: '$questions',
              as: 'question',
              cond: { $in: ['$$question._id', objectIdQuestions] },
            },
          },
        },
      },
    ])
    // Now, selectedQuestions contains the questions with matching IDs
    console.log(selectedQuestions)

    const quiz = {
      ...dataquiz,
      questions: selectedQuestions[0]?.questions,
    }

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz tidak ditemukan.' })
    }

    const correctAnswers = quiz.questions.map(
      (question) => question.jawabanbenar
    )

    let totalCorrectAnswers = 0
    let totalIncorrectAnswers = 0

    const studentAnswers = answers.map((answer) => {
      const correctAnswer = correctAnswers.find(
        (ca) => ca === answer.selectedAnswer
      )
      const isCorrect = !!correctAnswer

      if (isCorrect) {
        totalCorrectAnswers++
      } else {
        totalIncorrectAnswers++
      }

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      }
    })

    // Cek jumlah jawaban siswa dengan jumlah pertanyaan dalam kuis
    const totalQuestions = quiz.questions.length
    const score = (totalCorrectAnswers / totalQuestions) * 100

    // Hitung pertanyaan yang belum dijawab sebagai jawaban yang salah
    const answeredQuestionIds = studentAnswers.map(
      (answer) => answer.questionId
    )
    const unansweredQuestions = quiz.questions.filter(
      (question) => !answeredQuestionIds.includes(question._id.toString())
    )

    totalIncorrectAnswers += unansweredQuestions.length

    const unansweredAnswers = unansweredQuestions.map((question) => {
      return {
        questionId: question._id,
        selectedAnswer: '',
        isCorrect: false,
      }
    })

    studentAnswers.push(...unansweredAnswers)

    const studentAnswer = new StudentAnswer({
      quizId,
      studentId,
      answers: studentAnswers,
      totalCorrectAnswers,
      totalIncorrectAnswers,
      score,
    })

    await studentAnswer.save()

    res.status(201).json({
      message: 'Jawaban siswa telah berhasil disimpan.',
      studentAnswer,
      objectIdQuestions,
      selectedQuestions,
      quiz,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Terjadi kesalahan dalam menyimpan jawaban siswa.' })
  }
}

exports.getAllResultByStudentId = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.userId)
    const resultAnswer = await StudentAnswer.find({ studentId })
    const resultWithQuizDetails = []

    for (const result of resultAnswer) {
      const quiz = await Quiz.findById(result.quizId)
      resultWithQuizDetails.push({
        scoreDetails: result,
        quizDetails: {
          titleQuiz: quiz.title,
        },
      })
    }

    res.status(200).json({
      data: resultWithQuizDetails,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Terjadi kesalahan!' })
  }
}

exports.getAllResultByTeacher = async (req, res) => {
  const { sortBy } = req.query
  try {
    const { quizId } = req.params
    const resultAnswer = await StudentAnswer.find({ quizId })

    const resultWithQuizDetails = []

    for (const result of resultAnswer) {
      const quiz = await Quiz.findById(result.quizId)
      const user = await User.findById(result.studentId)
      resultWithQuizDetails.push({
        scoreDetails: result,
        quizDetails: {
          titleQuiz: quiz.title,
        },
        userDetails: {
          id: user._id,
          name: user.username,
        },
      })
    }

    function sortByHighestScoreAndLatestNew(query) {
      // Sorting berdasarkan score tertinggi dan timestamp terbaru
      resultWithQuizDetails.sort((a, b) => {
        const scoreA = a.scoreDetails.score
        const scoreB = b.scoreDetails.score
        const timestampA = new Date(a.scoreDetails.submittedAt).getTime()
        const timestampB = new Date(b.scoreDetails.submittedAt).getTime()

        if (query === 'highestScore') {
          return scoreB - scoreA
        } else if (query === 'latestNew') {
          return timestampB - timestampA
        } else {
          console.error('Invalid query parameter')
          return 0
        }
      })

      let uniqueData = {}
      resultWithQuizDetails.forEach((entry) => {
        const studentId = entry.scoreDetails.studentId
        if (
          !uniqueData[studentId] ||
          new Date(entry.scoreDetails.submittedAt).getTime() >
            new Date(uniqueData[studentId].scoreDetails.submittedAt).getTime()
        ) {
          uniqueData[studentId] = entry
        }
      })

      let sortedAndUniqueData = Object.values(uniqueData)

      return sortedAndUniqueData
    }

    res.status(200).json({
      data:
        sortBy === 'all'
          ? resultWithQuizDetails
          : sortByHighestScoreAndLatestNew(sortBy),
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Terjadi kesalahan!' })
  }
}

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params
    const deletedResult = await StudentAnswer.findByIdAndDelete(id)
    if (!deletedResult) {
      return res.status(404).json({ message: 'Result tidak ditemukan' })
    }
    res
      .status(200)
      .json({ message: 'Berhasil menghapus Result!', deletedResult })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Terjadi kesalahan!' })
  }
}

exports.getResultByQuizAndStudent = async (req, res) => {
  const { quizId, studentId } = req.params

  try {
    const result = await StudentAnswer.find({ quizId, studentId })

    if (result.length === 0) {
      return res.status(404).json({ message: 'Hasil tidak ditemukan' })
    }

    return res.status(200).json({ result })
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message)
    return res.status(500).json({ message: 'Terjadi kesalahan internal' })
  }
}
