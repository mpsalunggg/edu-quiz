import { Button, Col, Row } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CardStudentQuiz from '../../../components/CardStudentQuiz'
import NoItem from '../../../components/NoItem'
import { getQuizByTeacher } from '../../../features/quiz/quizActions'

const StudentQuizTeacherPage = () => {
  const { teacherId } = useParams()
  const dispatch = useDispatch()
  const { dataAllQuiz } = useSelector((store) => store.quiz)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getQuizByTeacher({ id: teacherId }))
  }, [])
  return (
    <section>
      <div className="flex lg:flex-row flex-col justify-between items-center lg:px-12 px-4 pt-4 pb-8 gap-2">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          Choose Your Quiz!
        </h1>
        <Button
          onClick={() => navigate('/student-quiz')}
          className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
          style={{
            color: 'white',
          }}
        >
          Kembali
        </Button>
      </div>
      <div>
        {dataAllQuiz.length === 0 ? (
          <NoItem />
        ) : (
          <Row gutter={[16, 16]}>
            {dataAllQuiz.map((item, index) => (
              <Col key={index} xs={24} lg={12}>
                <CardStudentQuiz data={item} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </section>
  )
}
export default StudentQuizTeacherPage
