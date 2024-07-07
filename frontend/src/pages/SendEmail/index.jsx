import { AiOutlineMail } from 'react-icons/ai'
import Logo from '../../assets/images/logo.svg'

const SendEmail = () => {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <div className="p-12 bg-white drop-shadow-[0_30px_60px_rgba(50,50,93,0.25)] rounded-3xl flex flex-col justify-center items-center gap-3 mx-4">
        <AiOutlineMail className="text-green-500 text-[120px]" />
        <img src={Logo} alt="" className="w-24" />
        <div>
          <p className="text-center text-gray-500 italic">
            Registrasi Berhasil, Silahkan Cek Email Anda Untuk Melakukan Verifikasi!
          </p>
        </div>
      </div>
    </section>
  )
}
export default SendEmail
