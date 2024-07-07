/* eslint-disable no-constant-condition */
// import { Button } from "antd"
import { Button } from 'antd'
import { BiCheckCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import { Loading } from '../../components'
import { useVerification } from '../../hooks'

const Verification = () => {
  const { loading } = useVerification()
  const navigate = useNavigate()

  if (loading) {
    return <Loading />
  }

  return (
    <section className="h-screen w-full flex justify-center items-center">
      <div className="p-12 bg-white drop-shadow-[0_30px_60px_rgba(50,50,93,0.25)] rounded-3xl flex flex-col justify-center items-center gap-3 mx-4">
        <BiCheckCircle className="text-green-500 text-[120px]" />
        <img src={Logo} alt="" className="w-24" />
        <div>
          <p className="text-center text-gray-500 italic">
            Verifikasi Berhasil, Silahkan Login Menggunakan Akun Yang Telah
            Didaftarkan!
          </p>
        </div>
        <Button
          className="bg-tema-green border-none hover:bg-yellow-400 mb-2"
          style={{
            color: 'white',
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    </section>
  )
}
export default Verification
