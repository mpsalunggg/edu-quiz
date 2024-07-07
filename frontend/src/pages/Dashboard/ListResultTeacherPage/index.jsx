import { Button, Select } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { HiOutlineChartSquareBar } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CardScore from '../../../components/CardScore'
import NoItem from '../../../components/NoItem'
import { getAllResultQuizByTeacher } from '../../../features/quiz/quizActions'

const ListResultTeacherPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [option, setOption] = useState('all')
  const { dataListScoreByTeacher } = useSelector((store) => store.quiz)
  console.log(dataListScoreByTeacher)
  useEffect(() => {
    dispatch(getAllResultQuizByTeacher({ idQuiz: id, option }))
  }, [option])
  return (
    <section>
      <div className="flex justify-between items-center lg:px-12 px-4 pt-4 pb-8">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          <HiOutlineChartSquareBar className="text-4xl" /> List Score
        </h1>
        <div className='flex gap-3'>
          <Select
            defaultValue="all"
            className='w-40'
            onChange={(value) => {
              setOption(value)
            }}
            options={[
              {
                value: 'all',
                label: 'All',
              },
              {
                value: 'highestScore',
                label: 'Skor Tertinggi',
              },
              {
                value: 'latestNew',
                label: 'Skor Terbaru',
              },
            ]}
          />
          <Button
            className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
            style={{
              color: 'white',
            }}
            onClick={() => {
              navigate('/result-quiz-teacher')
            }}
          >
            Back
          </Button>
        </div>
      </div>
      {dataListScoreByTeacher.length === 0 ? (
        <NoItem />
      ) : (
        dataListScoreByTeacher?.map((item, index) => {
          return <CardScore key={index} data={item} idQuiz={id} />
        })
      )}
    </section>
  )
}
export default ListResultTeacherPage
