/* eslint-disable react/prop-types */
import { Button, Card, Modal, Tag } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { HiOutlineClock, HiTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import {
  deleteResult,
  getAllResultQuizByTeacher,
} from '../../features/quiz/quizActions'

const CardScore = ({ data, idQuiz }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { quizDetails, scoreDetails } = data
  const formattedDate = moment(scoreDetails?.submittedAt).format(
    'dddd/DD-MM-YYYY'
  )
  const formattedTime = moment(scoreDetails?.submittedAt).format('A-hh.mm')

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    await dispatch(deleteResult({ idResult: data?.scoreDetails?._id }))
    await dispatch(getAllResultQuizByTeacher({ idQuiz }))
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <section>
      <section className="w-full p-4">
        <Card>
          {data?.userDetails?.name && (
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl text-tema-green font-poppins">
                  {data?.userDetails?.name.replace(/^\w/, (char) =>
                    char.toUpperCase()
                  )}
                </h1>
                <p className="text-tema-green">
                  {data?.userDetails?.id.slice(0, 6).toUpperCase()}
                </p>
              </div>
              <HiTrash className="text-red-500 text-2xl" onClick={showModal} />
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl text-yellow-400 font-semibold">
                {quizDetails?.titleQuiz}
              </h1>
              <div className="flex gap-1 items-center">
                <HiOutlineClock className="text-gray-400" />
                <p className="text-gray-400">{formattedTime}</p>
              </div>
            </div>
            <p className="text-gray-400">{formattedDate}</p>
            <div>
              <p className="text-4xl text-yellow-400 font-bold">
                {Math.floor(scoreDetails?.score)}
              </p>
            </div>
            {scoreDetails.score >= 70 ? (
              <Tag color="green">😃 Lulus</Tag>
            ) : scoreDetails.score >= 60 ? (
              <Tag color="blue">😐 Standar</Tag>
            ) : (
              <Tag color="red">😢 Hmmm</Tag>
            )}
          </div>
        </Card>
      </section>
      <Modal
        title={
          <div className="flex gap-2">
            <FaTrashAlt className="text-red-500 text-2xl" /> Apakah Anda Yakin
            Ingin Menghapus Result Ini?
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="bg-white"
            style={{
              color: 'gray',
              border: 'lightgray 1px solid',
            }}
            ghost={false}
          >
            Batal
          </Button>,
          <Button
            key="create"
            onClick={handleOk}
            className="bg-tema-green border-none hover:bg-yellow-400"
            style={{
              color: 'white',
            }}
          >
            <div className="flex items-center">Hapus</div>
          </Button>,
        ]}
      ></Modal>
    </section>
  )
}
export default CardScore
