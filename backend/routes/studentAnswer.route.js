const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const studentAnswerController = require('../controllers/studentAnswer.controller')
const router = express.Router()

router.get(
  '/result',
  authMiddleware.authenticateToken,
  studentAnswerController.getAllResultByStudentId
)
router.delete('/result/:id', studentAnswerController.deleteResult)

router.get('/result-teacher/:quizId', studentAnswerController.getAllResultByTeacher)
router.post('/:quizId', studentAnswerController.createStudentAnswer)

router.get(
  '/getResultByQuizAndStudent/:quizId/:studentId',
  studentAnswerController.getResultByQuizAndStudent
)


module.exports = router
