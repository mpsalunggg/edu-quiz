/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { createQuestion } from '../../features/quiz/quizActions'
import TextArea from 'antd/es/input/TextArea'
import { useParams } from 'react-router-dom'

const { Option } = Select

const AddQuestion = ({ visible, onCancel }) => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [options, setOptions] = useState(['', '', '', ''])

  const handleCreateQuiz = async (values) => {
    try {
      await dispatch(createQuestion({ id, values }))
    } catch (err) {
      console.error('Gagal membuat quiz:', err)
    }
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values)
      const quizData = {
        pertanyaan: values.question,
        options: [
          { value: values.option1 },
          { value: values.option2 },
          { value: values.option3 },
          { value: values.option4 },
        ],
        jawabanbenar: values.jawabanbenar,
      }
      handleCreateQuiz(quizData)
      onCancel()
      form.resetFields()
      setOptions(['', '', '', ''])
    })
  }

  const handleOptionChange = (value, index) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <Modal
      title="Tambah Pertanyaan Baru"
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
      <Form form={form} name="addQuestionForm" layout="vertical">
        <Form.Item
          name="question"
          rules={[
            {
              required: true,
              message: 'Silakan masukkan question quiz!',
            },
          ]}
        >
          <TextArea placeholder="Pertanyaan" />
        </Form.Item>
        {options.map((option, index) => (
          <Form.Item
            key={`option-${index}`}
            name={`option${index + 1}`}
            rules={[
              {
                required: true,
                message: `Silakan masukkan Option ${index + 1}!`,
              },
            ]}
          >
            <Input
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(e.target.value, index)}
            />
          </Form.Item>
        ))}
        <Form.Item
          name="jawabanbenar"
          rules={[
            {
              required: true,
              message: 'Silakan pilih jawaban yang benar!',
            },
          ]}
          label="Jawaban Benar"
        >
          <Select placeholder="Pilih jawaban yang benar">
            {options.map((option, index) => (
              <Option key={`option-${index}`} value={`${option}`}>
                {`${option}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddQuestion
