/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, Modal, Popconfirm, Radio, Space } from 'antd'
import { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteQuestion, getQuestionById } from '../../features/quiz/quizActions'
import EditQuestion from '../EditQuestion'

const CardQuestion = ({ data }) => {
  const { options, jawabanbenar, pertanyaan } = data
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { id } = useParams()

  const showModalEdit = () => {
    dispatch(getQuestionById({ idQuiz: id, idQuestion: data._id }))
    setIsModalVisible(true)
  }

  const handleCancelEdit = () => {
    setIsModalVisible(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    dispatch(deleteQuestion({idQuiz: id, idQuestion: data?._id}))
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Card className="my-4">
      <div className="flex justify-between">
        <div>
          <p className="text-lg mb-2">{pertanyaan}</p>
          {/* <Radio.Group> */}
          <div className="flex flex-col">
            {options.map((option) => (
              <Radio
                key={option._id}
                value={option._id}
                checked={option.value === jawabanbenar}
              >
                {option.value}
              </Radio>
            ))}
          </div>
        </div>
        {/* </Radio.Group> */}
        <Space className="mt-2">
          <FaTrashAlt
            className="text-red-500  lg:text-2xl text-lg cursor-pointer"
            onClick={showModal}
          />
          <FaEdit
            className="text-blue-500  lg:text-2xl text-lg cursor-pointer"
            onClick={showModalEdit}
          />
        </Space>
      </div>
      <Modal
        title={
          <div className="flex gap-2">
            <FaTrashAlt className="text-red-500 text-2xl" /> Apakah Anda Yakin
            Ingin Menghapus Pertanyaan Ini?
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
      <EditQuestion
        visible={isModalVisible}
        onCancel={handleCancelEdit}
        id={data?._id}
      />
    </Card>
  )
}

export default CardQuestion
