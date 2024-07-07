const express = require('express')
const quizController = require('../controllers/quiz.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/', quizController.getAllQuiz)
router.get(
  '/with-user',
  authMiddleware.authenticateToken,
  quizController.getAllQuizzWithUser
)
router.get('/:id', quizController.getQuizById)
router.get('/:quizId/question/:questionId', quizController.getQuestionById)
router.get(
  '/student/:quizId',
  authMiddleware.authenticateToken,
  quizController.getQuizByIdWithoutCorrectAnswer
)
router.get('/student-quiz/:teacherId', quizController.getQuizByTeacher)

router.post('/', quizController.createQuiz)
router.post('/:id/question', quizController.createQuestion)

router.put('/:quizId/question/:questionId', quizController.updateQuestion)
router.put('/:id', quizController.updateQuiz)

router.delete('/:id', quizController.deleteQuiz)
router.delete('/:quizId/question/:questionId', quizController.deleteQuestion)

module.exports = router
