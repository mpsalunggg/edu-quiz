/* eslint-disable react/prop-types */
import { Button, Modal, Select, Input, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getQuizById, updateQuestion } from '../../features/quiz/quizActions'

const EditQuestion = ({ visible, onCancel, id }) => {
  const { id: idQuiz } = useParams()
  const dispatch = useDispatch()
  const { dataQuestionById, loading } = useSelector((store) => store.quiz)

  const [formValues, setFormValues] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  })

  const handleUpdateQuestion = async () => {
    try {
      const quizData = {
        pertanyaan: formValues.question,
        options: formValues.options.map((value) => ({ value })),
        jawabanbenar: formValues.correctAnswer,
      }
      await dispatch(
        updateQuestion({ idQuiz, idQuestion: id, values: quizData })
      )
      await dispatch(getQuizById(idQuiz))
      onCancel()
    } catch (err) {
      console.log(err)
    }
  }

  const handleOk = () => {
    handleUpdateQuestion()
    onCancel()
  }

  const handleOptionChange = (value, index) => {
    const newOptions = [...formValues.options]
    newOptions[index] = value
    setFormValues({
      ...formValues,
      options: newOptions,
    })
  }

  useEffect(() => {
    if (dataQuestionById) {
      const updatedOptions = [
        dataQuestionById.option1 || '',
        dataQuestionById.option2 || '',
        dataQuestionById.option3 || '',
        dataQuestionById.option4 || '',
      ]

      setFormValues({
        question: dataQuestionById.question || '',
        options: updatedOptions,
        correctAnswer: dataQuestionById.jawabanbenar || '',
      })
    }
  }, [dataQuestionById])

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
        <Form className="my-4" layout='vertical'>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Silakan masukkan question quiz!',
              },
            ]}
          >
            <TextArea
              placeholder="Pertanyaan"
              value={formValues.question}
              onChange={(e) =>
                setFormValues({ ...formValues, question: e.target.value })
              }
            />
          </Form.Item>
          {formValues.options.map((option, index) => (
            <Form.Item
              key={index}
              rules={[
                {
                  required: true,
                  message: `Silakan masukkan Option ${index + 1}!`,
                },
              ]}
            >
              <Input
                key={`option-${index}`}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
              />
            </Form.Item>
          ))}
          <Form.Item
            label="Jawaban Benar"
            rules={[
              {
                required: true,
                message: 'Silakan pilih jawaban yang benar!',
              },
            ]}
          >
            <Select
              placeholder="Pilih jawaban yang benar"
              value={formValues.correctAnswer}
              onChange={(value) =>
                setFormValues({ ...formValues, correctAnswer: value })
              }
            >
              {formValues.options.map((option, index) => (
                <Select.Option key={`option-${index}`} value={option}>
                  {`${index + 1}. ${option}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default EditQuestion
