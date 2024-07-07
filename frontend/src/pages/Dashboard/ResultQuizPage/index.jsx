import { Button, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { HiOutlineClock } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../../components'
import {
  getQuizById,
  getResultByQuizAndStudent,
} from '../../../features/quiz/quizActions'
import { formatedDate, formatedTime } from '../../../utils/fomatedDate'

const ResultQuizPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { studentAnswer, dataQuizById, dataResultByQuizAndStudent } =
    useSelector((store) => store.quiz)
  const { score, quizId, totalCorrectAnswers, totalIncorrectAnswers } =
    studentAnswer?.studentAnswer || {}
  const { title } = dataQuizById

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
      dispatch(getQuizById(quizId))

      if (studentAnswer?.studentAnswer !== undefined) {
        dispatch(getResultByQuizAndStudent({ idQuiz: quizId }))
      }
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, quizId, studentAnswer?.studentAnswer])

  const getEmoticon = (score) => {
    if (score >= 80) {
      return '😃'
    } else if (score >= 60) {
      return '😐'
    } else {
      return '😢'
    }
  }
  if (score === undefined) {
    navigate('/student-quiz')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-bold text-4xl text-tema-green">
        Result Quiz {getEmoticon(score)}
      </h1>
      <div className="flex gap-2">
        <p className="text-yellow-400 text-2xl">Quiz</p>
        <p className="text-yellow-400 text-2xl font-bold">{title}</p>
      </div>
      <div className="flex gap-4 my-8">
        <div className="w-[500px] p-4 h-72 overflow-y-auto shadow-xl rounded-lg border-[1px] border-gray-200 flex flex-col gap-2">
          <h1 className="text-gray-500">Riwayat Pengerjaan</h1>
          {dataResultByQuizAndStudent?.result?.map((item) => {
            return (
              <div
                key={item._id}
                className="w-full p-4 border-[1px] border-gray-200 flex justify-between items-center"
              >
                <div className="flex flex-col gap-2 items-start">
                  {item.score >= 80 ? (
                    <Tag color="green">😃 Lulus</Tag>
                  ) : item.score >= 60 ? (
                    <Tag color="blue">😐 Standar</Tag>
                  ) : (
                    <Tag color="red">😢 Hmmm</Tag>
                  )}
                  <div className="flex gap-1 items-center">
                    <HiOutlineClock className="text-gray-400" />
                    <p className="text-gray-400">
                      {formatedDate(item?.submittedAt)} /{' '}
                      {formatedTime(item?.submittedAt)}
                    </p>
                  </div>
                </div>
                <h1 className="text-yellow-400 text-[30px]">
                  {Math.floor(item.score)}
                </h1>
              </div>
            )
          })}
        </div>
        <div className="w-[400px] h-72 shadow-xl rounded-lg border-[1px] border-gray-200 flex flex-col items-center justify-center">
          <p className="font-poppins font-semibold text-tema-green">Score</p>
          <p className="text-yellow-400 text-[120px] font-semibold">
            {Math.floor(score)}
          </p>
          <div className="flex gap-2">
            <p className="text-tema-green">Benar: {totalCorrectAnswers}</p>
            <p className="text-red-500">Salah: {totalIncorrectAnswers}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-400 italic">
        Terima kasih sudah menjawab Quiznya!
      </p>
      <Button
        className="bg-tema-green border-none"
        style={{
          color: 'white',
        }}
        onClick={() => navigate('/student-quiz')}
      >
        Back
      </Button>
    </div>
  )
}

export default ResultQuizPage
