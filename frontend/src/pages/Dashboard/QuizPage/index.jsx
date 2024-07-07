/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button, Row, Col, Pagination, Spin } from 'antd'
import { AddQuiz, CardQuiz, Loading } from '../../../components'
import { FiFileText } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getQuizWithUser } from '../../../features/quiz/quizActions'
import NoItem from '../../../components/NoItem'

const QuizPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Tambahkan state currentPage
  const pageSize = 8 // Jumlah item per halaman

  const dispatch = useDispatch()
  const { loading, dataQuizWithUser } = useSelector((store) => store.quiz)

  useEffect(() => {
    dispatch(getQuizWithUser())
  }, [dispatch])
  
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  return (
    <section>
      <div className="flex justify-between items-center lg:px-12 px-4 pt-4 pb-8">
        <h1 className="text-3xl text-tema-green font-medium flex items-center gap-1">
          <FiFileText className="text-4xl" /> Quiz
        </h1>
        <Button
          onClick={showModal}
          className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
          style={{
            color: 'white',
          }}
        >
          Tambah Quiz
        </Button>
      </div>
      {dataQuizWithUser.length === 0 ? (
        <NoItem />
      ) : (
        <Row gutter={[16, 16]}>
          {dataQuizWithUser.slice(startIndex, endIndex).map((quiz, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <CardQuiz data={quiz} />
            </Col>
          ))}
        </Row>
      )}

      {dataQuizWithUser.length <= 8 ? null : (
        <Pagination
          current={currentPage}
          total={dataQuizWithUser?.length}
          pageSize={pageSize}
          onChange={handleChangePage}
          style={{ textAlign: 'center' }}
        />
      )}
      <AddQuiz visible={isModalVisible} onCancel={handleCancel} />
    </section>
  )
}

export default QuizPage
