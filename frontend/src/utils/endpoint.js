const BASE_URL = import.meta.env.VITE_BASE_URL_BE

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
