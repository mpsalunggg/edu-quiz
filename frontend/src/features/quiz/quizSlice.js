/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  getQuizWithUser,
  deleteQuiz,
  createQuiz,
  getQuizById,
  updateQuiz,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getAllQuiz,
  getStartQuiz,
  createStudentAnswer,
  getAllResultQuizByIdStudent,
  getAllResultQuizByTeacher,
  deleteResult,
  getResultByQuizAndStudent,
  getAllTeacher,
  enrollTeacher,
  getTeacherByStudent,
  unEnrollTeacher,
  getQuizByTeacher,
  getStudentsByTeacher,
} from './quizActions'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    dataQuizWithUser: [],
    dataQuizById: {},
    dataQuestion: [],
    dataQuestionById: {},
    dataAllQuiz: [],
    dataStartQuiz: null,
    loading: false,
    error: null,
    endTime: 0,
    selectedOptions: {},
    studentAnswer: {},
    dataListScoreByStudentId: [],
    dataListScoreByTeacher: [],
    dataResultByQuizAndStudent: {},
    dataAllTeacher: [],
    dataTeacherByStudent: [],
    dataListStudentsByTeacher: [],
  },
  reducers: {
    setOptions: (state, action) => {
      state.selectedOptions = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizWithUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuizWithUser.fulfilled, (state, action) => {
        state.loading = false
        state.dataQuizWithUser = action.payload
      })
      .addCase(getQuizWithUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = true
        const deletedQuizId = action.payload
        state.dataQuizWithUser = state.dataQuizWithUser.filter(
          (quiz) => quiz._id !== deletedQuizId
        )
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = false
      })
      .addCase(createQuiz.pending, (state) => {
        state.loading = true
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false
        // state.dataQuizWithUser.push(action.payload)
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuizById.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.loading = false
        state.dataQuizById = action.payload
      })
      .addCase(getQuizById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false
        state.dataQuizById = action.payload
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuestionById.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false
        state.dataQuestionById = action.payload
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.laoding = false
        state.dataQuizById = action.payload
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.laoding = false
        state.error = action.error.message
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false
        state.dataQuizById = action.payload.deletedQuestion
      })
      .addCase(getAllQuiz.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllQuiz.fulfilled, (state, action) => {
        state.loading = false
        state.dataAllQuiz = action.payload
      })
      .addCase(getStartQuiz.pending, (state) => {
        state.loading = true
      })
      .addCase(getStartQuiz.fulfilled, (state, action) => {
        state.loading = false
        state.dataStartQuiz = action.payload.data
        state.endTime = action.payload.endTime
      })
      .addCase(createStudentAnswer.pending, (state) => {
        state.loading = true
      })
      .addCase(createStudentAnswer.fulfilled, (state, action) => {
        state.loading = false
        state.studentAnswer = action.payload
        state.selectedOptions = {}
      })
      .addCase(getAllResultQuizByIdStudent.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllResultQuizByIdStudent.fulfilled, (state, action) => {
        state.loading = false
        state.dataListScoreByStudentId = action.payload
      })
      .addCase(getAllResultQuizByTeacher.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllResultQuizByTeacher.fulfilled, (state, action) => {
        state.loading = false
        state.dataListScoreByTeacher = action.payload
      })
      .addCase(deleteResult.pending, (state) => {
        state.loading = false
      })
      .addCase(deleteResult.fulfilled, (state) => {
        state.loading = true
      })
      .addCase(getResultByQuizAndStudent.pending, (state) => {
        state.loading = false
      })
      .addCase(getResultByQuizAndStudent.fulfilled, (state, action) => {
        state.loading = true
        state.dataResultByQuizAndStudent = action.payload
      })
      .addCase(getAllTeacher.pending, (state) => {
        state.loading = false
      })
      .addCase(getAllTeacher.fulfilled, (state, action) => {
        state.loading = true
        state.dataAllTeacher = action.payload
      })
      .addCase(enrollTeacher.pending, (state) => {
        state.loading = false
      })
      .addCase(enrollTeacher.fulfilled, (state) => {
        state.loading = true
      })
      .addCase(getTeacherByStudent.pending, (state) => {
        state.loading = false
      })
      .addCase(getTeacherByStudent.fulfilled, (state, action) => {
        state.loading = true
        state.dataTeacherByStudent = action.payload
      })
      .addCase(unEnrollTeacher.pending, (state) => {
        state.loading = false
      })
      .addCase(unEnrollTeacher.fulfilled, (state) => {
        state.loading = true
      })
      .addCase(getQuizByTeacher.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuizByTeacher.fulfilled, (state, action) => {
        state.loading = false
        state.dataAllQuiz = action.payload
      })
      .addCase(getStudentsByTeacher.pending, (state) => {
        state.loading = true
      })
      .addCase(getStudentsByTeacher.fulfilled, (state, action) => {
        state.loading = false
        state.dataListStudentsByTeacher = action.payload
      })
  },
})

export const { setOptions } = quizSlice.actions
export default quizSlice.reducer
