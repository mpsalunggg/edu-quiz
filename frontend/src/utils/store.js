/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit'
import quizSlice from '../features/quiz/quizSlice'

const store = configureStore({
  reducer: {
    quiz: quizSlice,
  },
})

export default store
