/* eslint-disable react/prop-types */
import { Button, Card, Modal, Tag } from 'antd'
import { useState } from 'react'
import { VscDebugStart } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Rules from '../Rules'

const CardStudentQuiz = ({ data }) => {
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const hideModal = () => {
    setOpen(false)
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
    <>
      <Card
        cover={
          <div style={divStyle} className="rounded-t-lg p-4">
            {data?.questions?.length !== 0 && (
              <div className="flex justify-end text-white">
                <Button
                  className="bg-tema-green border-none hover:bg-yellow-400 mb-2 flex items-center"
                  style={{
                    color: 'white',
                  }}
                  onClick={() => showModal()}
                >
                  <VscDebugStart /> Start
                </Button>
              </div>
            )}
          </div>
        }
      >
        <div>
          <h1 className="text-tema-green text-xl font-semibold">
            {data.title}
          </h1>
          <p className=" text-gray-600">{data?.description}</p>
          <div className="flex pt-2 items-center">
            <Tag color={'blue'} className="mt-1">
              {data?.totalQuestionsForStudents
                ? data?.totalQuestionsForStudents + ' Nomor'
                : data?.questions?.length + ' Nomor'}
            </Tag>
            {/* <p className="flex items-center cursor-pointer text-gray-600">
              <AiOutlineTags className="text-lg" />
              Teacher {data?.author[0]?.username}
            </p> */}
          </div>
        </div>
      </Card>
      <Modal
        title="Are You Ready To Start Quiz?"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        footer={[
          <Button
            key="cancel"
            onClick={hideModal}
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
            // onClick={}
            className="bg-tema-green border-none hover:bg-yellow-400"
            style={{
              color: 'white',
            }}
          >
            <Link to={`/start-quiz/${data._id}`}>
              <div className="flex items-center">Start</div>
            </Link>
          </Button>,
        ]}
      >
        <Rules />
      </Modal>
    </>
  )
}
export default CardStudentQuiz
