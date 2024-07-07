/* eslint-disable react/prop-types */
import { Card } from 'antd'
import { HiChevronDoubleRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const CardResultTeacher = ({ data }) => {
  const navigate = useNavigate()
  return (
    <Card
      className="shadow-md"
      onClick={() => navigate(`/result-quiz-teacher/${data?._id}`)}
    >
      <div className="flex justify-between px-6">
        <h1 className="text-3xl text-tema-green">{data?.title}</h1>
        <HiChevronDoubleRight className="text-3xl text-tema-green" />
      </div>
    </Card>
  )
}
export default CardResultTeacher
