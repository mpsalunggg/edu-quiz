/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'antd'
import { useEffect } from 'react'
import { HiOutlineChartSquareBar } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoItem from '../../../components/NoItem'
import { getQuizWithUser } from '../../../features/quiz/quizActions'
import { setSessionData } from '../../../utils/sessionStorage'
import CardResultTeacher from '../CardResultTeacher'

const ResultQuizTeacherPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { dataQuizWithUser } = useSelector((store) => store.quiz)

  useEffect(() => {
    dispatch(getQuizWithUser())
  }, [])
  return (
    <section>
      <div className="flex justify-between items-center lg:px-12 px-4 pt-4 pb-8">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          <HiOutlineChartSquareBar className="text-4xl" /> List Score
        </h1>
        <Button
          className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
          style={{
            color: 'white',
          }}
          onClick={() => {
            setSessionData('active', ['2'])
            navigate('/quiz')
          }}
        >
          Add new Quiz
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        {dataQuizWithUser.length === 0 ? (
          <NoItem />
        ) : (
          dataQuizWithUser.map((item, index) => {
            return <CardResultTeacher key={index} data={item} />
          })
        )}
      </div>
    </section>
  )
}
export default ResultQuizTeacherPage
