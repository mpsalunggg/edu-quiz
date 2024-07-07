const express = require('express')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/getAllTeacher', userController.getAllTeacher)
router.get('/:id', authMiddleware.authenticateToken, userController.getUserById)
router.post('/enrollStudentToTeacher', userController.enrollStudentToTeacher)

router.get(
  '/getStudentsByTeacher/:teacherId',
  userController.getStudentsByTeacher
)
router.get('/getTeacher/:studentId', userController.getTeacherByEnroll)
router.get('/teacher/:id', userController.getStudentsByTeacherId)

router.delete(
  '/unenrollStudentToTeacher/:studentId/:teacherId',
  userController.unenrollStudentFromTeacher
)

module.exports = router
