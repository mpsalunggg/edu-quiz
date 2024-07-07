/* eslint-disable no-unused-vars */
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './layout'
import {
  DashboardPage,
  Home,
  Login,
  QuestionPage,
  QuizPage,
  Register,
  SendEmail,
  StudentQuizTeacherPage,
  TeacherPage,
  Verification,
} from './pages'
import ListResultPage from './pages/Dashboard/ListResultPage'
import ListResultTeacherPage from './pages/Dashboard/ListResultTeacherPage'
import ListStudentTeacherPage from './pages/Dashboard/ListStudentTeacherPage'
import ResultQuizPage from './pages/Dashboard/ResultQuizPage'
import ResultQuizTeacherPage from './pages/Dashboard/ResultQuizTeacherPage'
import StartQuiz from './pages/Dashboard/StartQuiz'
import StudentQuizPage from './pages/Dashboard/StudentQuizPage'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verification-email" element={<SendEmail />} />
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:id" element={<QuestionPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student-quiz" element={<StudentQuizPage />} />
          <Route
            path="/student-quiz/:teacherId"
            element={<StudentQuizTeacherPage />}
          />
          <Route path="/result-quiz" element={<ListResultPage />} />
          <Route
            path="/result-quiz-teacher"
            element={<ResultQuizTeacherPage />}
          />
          <Route
            path="/result-quiz-teacher/:id"
            element={<ListResultTeacherPage />}
          />
          <Route path="/student-list" element={<ListStudentTeacherPage />} />
        </Route>
        <Route path="/start-quiz/:id" element={<StartQuiz />} />
        <Route path="/score-quiz" element={<ResultQuizPage />} />
      </Routes>
    </>
  )
}

export default App
