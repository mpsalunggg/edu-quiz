/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, Modal, Tag } from 'antd'
import { useState } from 'react'
import { AiOutlineTags } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { FiClock, FiEdit2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteQuiz, getQuizById } from '../../features/quiz/quizActions'
import EditQuiz from '../EditQuiz'

const { Meta } = Card

const CardQuiz = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((store) => store.quiz)
  //   const { handleDelete } = useDeleteQuiz()
  const showModal = () => {
    setIsModalOpen(true)
  }
  const showModalEdit = () => {
    dispatch(getQuizById(data?._id))
    setIsModalVisible(true)
  }
  const handleOk = async () => {
    dispatch(deleteQuiz(data?._id))
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelEdit = () => {
    setIsModalVisible(false)
  }

  const cardStyle = {
    width: '100%',
    height: 'auto',
  }

  const divStyle = {
    backgroundImage: `url(${
      data?.thumb_quiz
        ? data?.thumb_quiz
        : 'https://wallpapers.com/images/hd/book-on-coffee-table-j05zkbjcb3vmmyjb.jpg'
    })`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '150px',
  }

  return (
    <Card
      style={cardStyle}
      className="mb-4"
      cover={
        <Link to={data?._id}>
          <div
            style={divStyle}
            className="rounded-t-md pl-7 pt-2 flex items-start border"
          >
            <Tag className="bg-tema-green text-white border-none">
              <p className="flex items-center gap-1 shadow-sm">
                <FiEdit2 /> {data?.questions?.length} Nomor
              </p>
            </Tag>
            <Tag className="bg-yellow-400  text-white border-none">
              <p className="flex items-center gap-1 shadow-sm">
                <FiClock /> {data?.timer} minutes
              </p>
            </Tag>
          </div>
        </Link>
      }
    >
      <div className="max-h-32">
        <Meta
          description={
            <div className="flex lg:flex-row justify-between items-center">
              <Link to={data?._id}>
                <div>
                  <h1 className="text-tema-green text-xl font-semibold cursor-pointer">
                    {data?.title}
                  </h1>
                  <p className="cursor-pointer text-gray-600">
                    {data?.description?.slice(0, 20) + '...'}
                  </p>
                  <p className="flex items-center cursor-pointer text-gray-600">
                    <AiOutlineTags className="text-lg" />{' '}
                    Teacher {data?.author?.length > 0 ? data.author[0].username : '-'}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col items-center justify-center gap-2">
                <FaTrashAlt
                  className="text-red-500 text-lg cursor-pointer"
                  onClick={showModal}
                />
                <FaEdit
                  className="text-blue-500 text-lg cursor-pointer"
                  onClick={showModalEdit}
                />
              </div>
            </div>
          }
        />
      </div>
      <Modal
        title={
          <div className="flex gap-2">
            <FaTrashAlt className="text-red-500 text-2xl" /> Apakah Anda Yakin
            Ingin Menghapus Quiz Ini?
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
      <EditQuiz
        visible={isModalVisible}
        onCancel={handleCancelEdit}
        id={data?._id}
      />
    </Card>
  )
}

export default CardQuiz
