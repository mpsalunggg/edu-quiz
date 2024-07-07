// import React from 'react'
import { Carousel } from 'antd'
import { HiOutlineServer } from 'react-icons/hi'
import { getSessionData } from '../../../utils/sessionStorage'
import Image1 from '../../../assets/images/image1.svg'

// const { Meta } = Card

const DashboardPage = () => {
  return (
    <section className="p-6 font-poppins">
      <div className="flex justify-between items-center">
        <h2 className="mb-8 flex flex-col">
          <span className="text-tema-green font-medium text-2xl font-poppins">
            Selamat Datang
          </span>{' '}
          <span className="text-yellow-400 text-4xl font-medium">
            {getSessionData('user')?.username}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl text-tema-green">
            {getSessionData('user')?.role}
          </h2>
          <HiOutlineServer className="text-4xl text-yellow-400" />
        </div>
      </div>
      <Carousel autoplay className="mb-8">
        <div className="w-full bg-center">
          <div
            className="h-96 bg-cover bg-no-repeat rounded-xl flex justify-center items-center backdrop-blur-xl bg-white"
            style={{
              backgroundImage: `url('https://reporter.rit.edu:8443/sites/pubDir/slideShow/08-16/212-1474-47783801.jpg')`,
            }}
          >
            <img src={Image1} alt="image1" className="w-80 drop-shadow-xl" />
            <div>
              <div
                className="font-poppins font-semibold text-tema-green text-4xl drop-shadow-xl"
                style={{
                  // WebkitTextStroke: '1px white',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
              >
                Platform Quiz Terbaru
              </div>
              <p
                className="font-poppins font-semibold text-2xl text-yellow-400 drop-shadow-xl"
                style={{
                  // WebkitTextStroke: '0.5px white',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
              >
                Mulai Quizmu sekarang juga!
              </p>
            </div>
          </div>
        </div>
        <div className="w-full bg-center">
          <div
            className="h-96 bg-cover bg-no-repeat rounded-xl"
            style={{
              backgroundImage: `url('https://ugc.futurelearn.com/uploads/images/4d/c9/header_4dc9321b-f608-4196-9fb7-02f6c0029a5f.jpg')`,
            }}
          ></div>
        </div>
      </Carousel>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <Card bordered key={index} className="rounded-lg shadow-lg">
            <div className="p-6 flex items-center justify-between">
              <div>
                <Meta title={card.title} description={card.description} />
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
              {card.icon}
            </div>
          </Card>
        ))}
      </div> */}
    </section>
  )
}

export default DashboardPage
