import { Button, Col, Row } from 'antd'
import { useEffect } from 'react'
import { HiOutlineMail, HiOutlineUser } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
  enrollTeacher,
  getAllTeacher,
} from '../../../features/quiz/quizActions'
import { getSessionData } from '../../../utils/sessionStorage'

const TeacherPage = () => {
  const dispatch = useDispatch()
  const { dataAllTeacher } = useSelector((store) => store.quiz)
  const handleEnroll = async (item) => {
    await dispatch(
      enrollTeacher({
        data: {
          teacherId: item?._id,
          studentId: getSessionData('user')._id,
        },
      })
    )
    await dispatch(getAllTeacher())
  }
  useEffect(() => {
    dispatch(getAllTeacher())
  }, [])
  return (
    <section>
      <div className="flex lg:flex-row flex-col justify-between items-center lg:px-12 px-4 pt-4 pb-8 gap-2">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          Enroll Your Teacher! For start Quiz
        </h1>
        <h1 className="text-4xl">😉</h1>
      </div>
      <div>
        <Row gutter={[16, 16]}>
          {dataAllTeacher.map((item) => (
            <Col key={item._id} xs={24} lg={12}>
              <div className="w-full p-4 shadow-md flex justify-between rounded-lg">
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
                      {item.students.length === 0 ? '-' : item.students.length}
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-tema-green border-none hover:bg-yellow-400 mb-2 flex items-center"
                  style={{
                    color: 'white',
                  }}
                  disabled={item.students.includes(getSessionData('user')._id)}
                  onClick={() => handleEnroll(item)}
                >
                  Enroll
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
export default TeacherPage
