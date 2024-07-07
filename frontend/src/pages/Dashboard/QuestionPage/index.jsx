/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Button, Card } from 'antd'
import { useEffect, useState } from 'react'
import { BsFillQuestionSquareFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AddQuestion, CardQuestion } from '../../../components'
import NoItem from '../../../components/NoItem'
import { getQuizById } from '../../../features/quiz/quizActions'

const QuestionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { dataQuizById, loading } = useSelector((store) => store.quiz)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const divStyle = {
    backgroundImage: `
  linear-gradient(to left, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 1)),
  url('${dataQuizById.thumb_quiz}')
`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: 'auto',
  }
  useEffect(() => {
    dispatch(getQuizById(id))
  }, [])

  return (
    <section>
      <div className="flex md:flex-row flex-col justify-between items-center px-12 pt-4 pb-8 gap-4">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          <BsFillQuestionSquareFill className="text-4xl" />
          Pertanyaan
        </h1>
        <Button
          onClick={showModal}
          className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
          style={{
            color: 'white',
          }}
        >
          Tambah Pertanyaan
        </Button>
      </div>
      <Card className="shadow-md p-4" style={divStyle}>
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl text-tema-green font-semibold">
              {dataQuizById?.title}
            </h1>
            <p className="text-gray-600">{dataQuizById?.description}</p>
          </div>
          <div className="lg:px-4 lg:py-2 p-2 bg-yellow-400 rounded-md flex lg:flex-col items-center justify-center text-center text-white">
            <span className="font-bold text-xl">
              {dataQuizById?.questions?.length
                ? dataQuizById?.questions?.length
                : '0'}
            </span>
            <span className="text-sm">No</span>
          </div>
        </div>
      </Card>
      <div>
        {dataQuizById?.questions?.length === 0 ? (
          <NoItem />
        ) : (
          dataQuizById?.questions?.map((item, index) => {
            return <CardQuestion key={index} data={item} />
          })
        )}
      </div>
      <AddQuestion visible={isModalVisible} onCancel={handleCancel} />
    </section>
  )
}
export default QuestionPage
