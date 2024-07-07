const BASE_URL = 'http://localhost:4444'

const LOGIN = BASE_URL + '/auth/login'
const REGISTER = BASE_URL + '/auth/register'
const VERIFY = BASE_URL + '/auth/verify/'

const QUIZ = BASE_URL + '/quiz/'
const START_QUIZ = QUIZ + 'student'
const STUDENT_ANSWER = BASE_URL + '/student-answer'
const USER = BASE_URL + '/users'

export {
  LOGIN,
  REGISTER,
  VERIFY,
  QUIZ,
  BASE_URL,
  START_QUIZ,
  STUDENT_ANSWER,
  USER
}
