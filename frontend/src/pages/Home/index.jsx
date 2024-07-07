import { Button } from 'antd'
import Logo from '../../assets/images/logo.svg'
import HomeImage from '../../assets/images/home.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="w-full font-poppins relative">
      <nav className="fixed top-0 bg-white z-10 py-8 lg:px-24 px-8 w-full">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" />
          <Link to={'/login'}>
            <Button
              className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
              style={{
                color: 'white',
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>
      <div className="h-screen lg:text-left text-center flex lg:flex-row flex-col-reverse lg:justify-between justify-center gap-4 lg:px-24 px-8 lg:items-center">
        <section className="lg:w-[700px] w-full">
          <div className="font-bold lg:text-[60px] text-[45px]">
            <span className="text-tema-green">Edu</span>{' '}
            <span className="text-yellow-400">Quiz</span>
          </div>
          <p className="lg:text-lg text-sm">
            Edu Quiz adalah sebuah platform pembelajaran online yang dirancang
            khusus untuk membantu siswa dan guru dalam mempersiapkan dan
            mengikuti quiz secara online
          </p>
          <p className="lg:text-lg text-sm">
            Yuk Daftarkan dirimu sekarang juga!👇
          </p>
          <Button
            className="mt-4 w-24 bg-tema-green border-none hover:bg-yellow-400 mb-2"
            style={{
              color: 'white',
            }}
          >
            Daftar
          </Button>
        </section>
        <div>
          <img
            src={HomeImage}
            alt="Home"
            className="lg:w-[650px] w-[450px] mx-auto"
          />
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-4 text-gray-400 italic">
        &copy;MuhamadPutraSatria
      </footer>
    </section>
  )
}

export default Home
