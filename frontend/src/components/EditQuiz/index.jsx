/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Form, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQuizById,
  getQuizWithUser,
  updateQuiz,
} from '../../features/quiz/quizActions'

const EditQuiz = ({ visible, onCancel, id }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { dataQuizById, loading } = useSelector((store) => store.quiz)
  const handleUpdateQuiz = async (values) => {
    try {
      await dispatch(updateQuiz({ id, values }))
      await dispatch(getQuizWithUser())
    } catch (err) {
      console.error('Gagal membuat quiz:', err)
    }
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values)
      handleUpdateQuiz(values)
      onCancel()
      form.resetFields()
    })
  }

  return (
    <Modal
      title={
        <div className="flex gap-2">
          <FaEdit className="text-blue-500 text-2xl" /> Edit Data ?
        </div>
      }
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
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
          <div className="flex items-center">Perbarui</div>
        </Button>,
      ]}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Form
          form={form}
          name="addQuizForm"
          layout="vertical"
          initialValues={dataQuizById}
        >
          <Form.Item
            name="title"
            label="Judul Quiz"
            rules={[
              {
                required: true,
                message: 'Silakan masukkan judul quiz!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="thumb_quiz" label="Thumbnail Quiz">
            <Input />
          </Form.Item>
          <Form.Item
            label="Limit Pertanyaan Siswa"
            name="totalQuestionsForStudents"
            rules={[
              {
                required: true,
                message: 'Masukkan limit pertanyaan pada Quiz!',
              },
            ]}
          >
            <InputNumber
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="timer"
            label="Waktu Quiz"
            rules={[
              {
                required: true,
                message: 'Silakan masukkan Waktu Quiz!',
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
export default EditQuiz
