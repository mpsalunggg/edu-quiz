import { useState, useEffect } from 'react'
import { Card, Button, Radio, Statistic, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createStudentAnswer,
  getStartQuiz,
} from '../../../features/quiz/quizActions'
import Logo from '../../../assets/images/logo.svg'
import { Loading } from '../../../components'
import { setOptions } from '../../../features/quiz/quizSlice'
import { getSessionData } from '../../../utils/sessionStorage'

const { Countdown } = Statistic

const StartQuiz = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    dataStartQuiz: quizData,
    endTime: quizEndTime,
    selectedOptions,
    studentAnswer,
  } = useSelector((store) => store.quiz)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [disableBtn, setDisableBtn] = useState(false)

  useEffect(() => {
    dispatch(getStartQuiz({ idQuiz: id }))
  }, [])

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleOptionChange = (e) => {
    const questionId = quizData.questions[currentQuestion]._id
    const selectedOption = e.target.value
    dispatch(setOptions({ ...selectedOptions, [questionId]: selectedOption }))
  }

  const handleSubmitQuiz = () => {
    const answers = Object.entries(selectedOptions).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedAnswer: selectedOption,
      })
    )

    const submissionData = {
      studentId: getSessionData('user')._id,
      answers,
      idQuestions: quizData?.questions?.map((item) => item._id),
    }

    dispatch(createStudentAnswer({ idQuiz: id, answerData: submissionData }))
    if (studentAnswer) {
      message.success('Berhasil Menyimpan Jawaban!', 3, () =>
        navigate(`/score-quiz`)
      )
    }
    setDisableBtn(true)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {quizData ? (
        <div>
          <div className="flex justify-between my-4">
            <Countdown
              value={quizEndTime}
              format="HH:mm:ss"
              valueStyle={{ color: '#00ACB5' }}
              onFinish={handleSubmitQuiz}
            />
            <img src={Logo} alt="" className="w-24" />
          </div>
          <div
            className="w-[400px] h-36 bg-cover bg-center rounded-lg shadow-slate-500 border-4 border-white"
            style={{
              backgroundImage: `url("${
                quizData.thumb_quiz
                  ? quizData.thumb_quiz
                  : 'https://wallpapers.com/images/hd/book-on-coffee-table-j05zkbjcb3vmmyjb.jpg'
              }")`,
            }}
          ></div>
          <Card
            title={quizData.questions[currentQuestion].pertanyaan}
            style={{ width: 400, marginTop: 20 }}
          >
            <Radio.Group
              onChange={handleOptionChange}
              value={
                selectedOptions[quizData.questions[currentQuestion]._id] ||
                undefined
              }
              className="flex flex-col"
            >
              {quizData.questions[currentQuestion].options.map((option) => (
                <Radio key={option._id} value={option.value}>
                  {option.value}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Button
                onClick={handlePrevQuestion}
                hidden={currentQuestion === 0}
                className="bg-tema-green border-none"
                style={{
                  color: 'white',
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleNextQuestion}
                hidden={currentQuestion === quizData.questions.length - 1}
                className="bg-tema-green border-none"
                style={{
                  color: 'white',
                }}
              >
                Next
              </Button>
            </div>
            {currentQuestion === quizData.questions.length - 1 && (
              <Button
                onClick={handleSubmitQuiz}
                disabled={disableBtn}
                className="bg-yellow-400 border-none flex items-center"
                style={{
                  color: 'white',
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default StartQuiz
