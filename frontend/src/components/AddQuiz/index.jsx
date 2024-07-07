/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Modal, Form, Input, Button, InputNumber } from 'antd'
import { FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { createQuiz, getQuizWithUser } from '../../features/quiz/quizActions'
import { getSessionData } from '../../utils/sessionStorage'

const { TextArea } = Input

const AddQuiz = ({ visible, onCancel }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const profile = getSessionData('user')
  const handleCreateQuiz = async (quizData) => {
    console.log('fox', quizData)
    try {
      await dispatch(createQuiz(quizData))
      await dispatch(getQuizWithUser())
    } catch (err) {
      console.error('Gagal membuat quiz:', err)
    }
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      handleCreateQuiz({ ...values, id_author: profile._id })
      onCancel()
      form.resetFields()
    })
  }

  return (
    <Modal
      title="Tambah Quiz Baru"
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
          <div className="flex items-center">
            <FiPlus className="text-[11px]" /> Kirim
          </div>
        </Button>,
      ]}
    >
      <Form form={form} name="addQuizForm" layout="vertical">
        <Form.Item
          name="title"
          label="Judul Quiz"
          rules={[
            {
              required: true,
              message: 'Silakan masukkan judul quiz!',
            },
            {
              max: 15,
              message: 'Minimal 15 Huruf!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="thumb_quiz" label="Thumbnail Quiz">
          <Input />
        </Form.Item>
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          name="timer"
          label="Waktu Quiz/Menit"
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
    </Modal>
  )
}

export default AddQuiz
