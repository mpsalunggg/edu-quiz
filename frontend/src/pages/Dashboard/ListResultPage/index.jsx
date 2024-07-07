/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'antd'
import { useEffect } from 'react'
import { HiOutlineChartSquareBar } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardScore from '../../../components/CardScore'
import NoItem from '../../../components/NoItem'
import { getAllResultQuizByIdStudent } from '../../../features/quiz/quizActions'
import { setSessionData } from '../../../utils/sessionStorage'

const ListResultPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { dataListScoreByStudentId } = useSelector((store) => store.quiz)
  useEffect(() => {
    dispatch(getAllResultQuizByIdStudent())
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
            setSessionData('active', ['3'])
            navigate('/student-quiz')
          }}
        >
          Choose Your Quiz
        </Button>
      </div>
      <div>
        {dataListScoreByStudentId.length === 0 ? (
          <NoItem />
        ) : (
          dataListScoreByStudentId?.map((item, index) => {
            return <CardScore key={index} data={item} />
          })
        )}
      </div>
    </section>
  )
}
export default ListResultPage
