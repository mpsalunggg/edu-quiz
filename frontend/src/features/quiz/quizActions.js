/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import axios from 'axios'
import { QUIZ, START_QUIZ, STUDENT_ANSWER, USER } from '../../utils/endpoint'
import { getToken, getSessionData } from '../../utils/sessionStorage'

export const getQuizWithUser = createAsyncThunk(
  'quiz/getQuizWithUser',
  async () => {
    try {
      const res = await axios.get(QUIZ + 'with-user', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuiz',
  async (quizId) => {
    try {
      await axios.delete(QUIZ + quizId)
      return quizId
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const createQuiz = createAsyncThunk(
  'quiz/createQuiz',
  async (quizData) => {
    try {
      const res = await axios.post(QUIZ, quizData)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getQuizById = createAsyncThunk(
  'quiz/getQuizById',
  async (quizId) => {
    try {
      const res = await axios.get(QUIZ + quizId)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const updateQuiz = createAsyncThunk(
  'quiz/updateQuiz',
  async ({ id, values }) => {
    try {
      const res = await axios.put(QUIZ + id, values)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const createQuestion = createAsyncThunk(
  'quiz/createQuestion',
  async ({ id, values }) => {
    try {
      const res = await axios.post(QUIZ + id + '/question', values)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getQuestionById = createAsyncThunk(
  'quiz/getQuestionById',
  async ({ idQuiz, idQuestion }) => {
    try {
      const res = await axios.get(QUIZ + idQuiz + '/question/' + idQuestion)
      const { pertanyaan, options, jawabanbenar } = res.data

      const initialValues = {
        question: pertanyaan,
        option1: options[0].value,
        option2: options[1].value,
        option3: options[2].value,
        option4: options[3].value,
        // options: [options[0].value, options[1].value, options[2].value, options.value[3]],
        jawabanbenar,
      }

      return initialValues
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const updateQuestion = createAsyncThunk(
  'quiz/updateQuestion',
  async ({ idQuiz, idQuestion, values }) => {
    try {
      const res = await axios.put(
        QUIZ + idQuiz + '/question/' + idQuestion,
        values
      )
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const deleteQuestion = createAsyncThunk(
  'quiz/deleteQuestion',
  async ({ idQuiz, idQuestion }) => {
    try {
      const res = await axios.delete(QUIZ + idQuiz + '/question/' + idQuestion)
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getAllQuiz = createAsyncThunk('quiz/getAllQuiz', async () => {
  try {
    const res = await axios.get(QUIZ)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
})

export const getStartQuiz = createAsyncThunk(
  'quiz/getStartQuiz',
  async ({ idQuiz }) => {
    try {
      const res = await axios.get(START_QUIZ + '/' + idQuiz, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const endTime = Date.now() + res.data.timer * 60000
      const data = {
        ...res.data,
        questions: res?.data?.questions?.slice(
          0,
          res?.data?.totalQuestionsForStudents
        ),
      }
      return { data, endTime }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const createStudentAnswer = createAsyncThunk(
  'quiz/createStudentAnswer',
  async ({ idQuiz, answerData }) => {
    try {
      const res = await axios.post(STUDENT_ANSWER + '/' + idQuiz, answerData)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getAllResultQuizByIdStudent = createAsyncThunk(
  'quiz/getAllResultQuizByIdStudent',
  async () => {
    try {
      const res = await axios.get(STUDENT_ANSWER + '/result', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      return res.data.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getAllResultQuizByTeacher = createAsyncThunk(
  'quiz/getAllResultQuizByTeacher',
  async ({ idQuiz, option }) => {
    try {
      const res = await axios.get(
        STUDENT_ANSWER + '/result-teacher/' + idQuiz,
        {
          params: {
            sortBy: option,
          },
        }
      )
      return res.data.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const deleteResult = createAsyncThunk(
  'quiz/deleteResult',
  async ({ idResult }) => {
    try {
      const res = await axios.delete(STUDENT_ANSWER + '/result/' + idResult)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getResultByQuizAndStudent = createAsyncThunk(
  'quiz/getResultByQuizAndStudent',
  async ({ idQuiz }) => {
    try {
      const res = await axios.get(
        STUDENT_ANSWER +
          '/getResultByQuizAndStudent/' +
          idQuiz +
          '/' +
          getSessionData('user')._id
      )
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getAllTeacher = createAsyncThunk(
  'quiz/getAllTeacher',
  async () => {
    try {
      const res = await axios.get(USER + '/getAllTeacher')
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const enrollTeacher = createAsyncThunk(
  'quiz/enrollTeacher',
  async ({ data }) => {
    console.log(data)
    try {
      const res = await axios.post(USER + '/enrollStudentToTeacher', data)
      message.success('Berhasil Enroll Teacher')
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)
export const unEnrollTeacher = createAsyncThunk(
  'quiz/unEnrollTeacher',
  async ({ data }) => {
    console.log(data)
    const { studentId, teacherId } = data
    try {
      const res = await axios.delete(
        USER + `/unenrollStudentToTeacher/${studentId}/${teacherId}`
      )
      message.open({
        type: 'success',
        content: 'Berhasil Unenroll!',
        duration: 2,
        className: 'mt-20',
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getTeacherByStudent = createAsyncThunk(
  'quiz/getTeacherByStudent',
  async () => {
    try {
      const res = await axios.get(
        USER + '/getTeacher/' + getSessionData('user')._id
      )
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getQuizByTeacher = createAsyncThunk(
  'quiz/getQuizByTeacher',
  async ({ id }) => {
    try {
      const res = await axios.get(QUIZ + 'student-quiz/' + id)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)

export const getStudentsByTeacher = createAsyncThunk(
  'quiz/getStudentsByTeacher',
  async () => {
    try {
      const res = await axios.get(
        USER + '/teacher/' + getSessionData('user')._id
      )
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)
      throw err
    }
  }
)
