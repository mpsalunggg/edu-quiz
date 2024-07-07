/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row } from 'antd'
import { useEffect } from 'react'
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoItem from '../../../components/NoItem'
// import CardStudentQuiz from '../../../components/CardStudentQuiz'
import {
  // getAllQuiz,
  getTeacherByStudent,
  unEnrollTeacher,
} from '../../../features/quiz/quizActions'
import { getSessionData } from '../../../utils/sessionStorage'

const StudentQuizPage = () => {
  const dispatch = useDispatch()
  const { dataTeacherByStudent } = useSelector((store) => store.quiz)
  const navigate = useNavigate()

  const handleUnEnroll = async (item) => {
    await dispatch(
      unEnrollTeacher({
        data: {
          teacherId: item?._id,
          studentId: getSessionData('user')._id,
        },
      })
    )
    await dispatch(getTeacherByStudent())
  }

  useEffect(() => {
    dispatch(getTeacherByStudent())
  }, [])
  return (
    <section>
      <div className="flex lg:flex-row flex-col justify-between items-center lg:px-12 px-4 pt-4 pb-8 gap-2">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          Choose Your Quiz!
        </h1>
        <h1 className="text-4xl">😉</h1>
      </div>
      <div>
        <Row gutter={[16, 16]}>
          {dataTeacherByStudent?.length === 0 ? (
            <div className="flex justify-center w-full">
              <NoItem />
            </div>
          ) : (
            dataTeacherByStudent.map((item, index) => (
              <Col key={index} xs={24} lg={12}>
                <div
                  key={item._id}
                  className="w-full p-4 shadow-md flex justify-between rounded-lg"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center w-full">
                      <HiOutlineMail className="text-2xl" />
                      <h1>{item.email}</h1>
                    </div>
                    <div className="flex gap-2 items-center w-full">
                      <HiOutlineUser className="text-2xl" />
                      <h1>Teacher {item.username}</h1>
                    </div>
                    <div className="flex gap-2 items-center w-full">
                      <h1 className="text-tema-green">Student: </h1>
                      <p className="text-tema-green font-bold">
                        {item.students.length === 0
                          ? '-'
                          : item.students.length}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="w-24 bg-tema-green border-none hover:bg-yellow-400 mb-2 flex justify-center items-center"
                      style={{
                        color: 'white',
                      }}
                      onClick={() => handleUnEnroll(item)}
                    >
                      UnEnroll
                    </Button>
                    <Button
                      className="w-24 bg-yellow-400 border-none hover:bg-tema-green mb-2 flex items-center"
                      style={{
                        color: 'white',
                      }}
                      onClick={() => navigate('/student-quiz/' + item._id)}
                    >
                      Lihat Quiz
                    </Button>
                    {/* <CardStudentQuiz data={quiz} /> */}
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </div>
    </section>
  )
}
export default StudentQuizPage
