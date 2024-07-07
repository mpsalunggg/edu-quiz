import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoPeopleSharp } from 'react-icons/io5'
import {
  getStudentsByTeacher,
  unEnrollTeacher,
} from '../../../features/quiz/quizActions'
import { HiTrash } from 'react-icons/hi'
import { getSessionData } from '../../../utils/sessionStorage'
import NoItem from '../../../components/NoItem'
const ListStudentTeacherPage = () => {
  const dispatch = useDispatch()
  const { dataListStudentsByTeacher } = useSelector((store) => store.quiz)

  const deleteStudents = async (idStudent) => {
    // console.log(idStudent)
    await dispatch(
      unEnrollTeacher({
        data: {
          studentId: idStudent,
          teacherId: getSessionData('user')._id,
        },
      })
    )
    await dispatch(getStudentsByTeacher())
  }

  useEffect(() => {
    dispatch(getStudentsByTeacher())
  }, [])
  return (
    <section>
      <div className="flex justify-between items-center lg:px-12 px-4 pt-4 pb-8">
        <div className="flex gap-2">
          <IoPeopleSharp className="text-4xl text-tema-green" />
          <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
            List Students
          </h1>
        </div>
        <p className="text-tema-green text-xl font-semibold">
          {dataListStudentsByTeacher?.length === 0
            ? 'Tidak Ada Student'
            : dataListStudentsByTeacher?.length + ' Students'}
        </p>
      </div>
      <div>
        {dataListStudentsByTeacher?.length === 0 ? (
          <NoItem />
        ) : (
          dataListStudentsByTeacher?.map((item) => {
            return (
              <div
                key={item._id}
                className="w-full rounded-md shadow-md border-2 border-gray-100 py-4 px-12 mb-3 flex justify-between items-center"
              >
                <div>
                  <h1 className="text-tema-green text-lg font-semibold">
                    {item?.username}
                  </h1>
                  <p>{item?.email}</p>
                </div>
                <HiTrash
                  className="text-red-500 text-3xl cursor-pointer"
                  onClick={() => deleteStudents(item?._id)}
                />
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
export default ListStudentTeacherPage
