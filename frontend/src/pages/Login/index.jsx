import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import LoginIcon from '../../assets/images/loginicon.svg'
import Logo from '../../assets/images/logo.svg'
import { useLogin } from '../../hooks'

const Login = () => {
  const { handleSubmit } = useLogin()
  return (
    <section className="bg-white h-screen flex justify-center items-center gap-12">
      <img
        src={LoginIcon}
        alt="Login Icon"
        className="md:w-72 lg:w-80 md:inline hidden"
      />
      <div className="w-[400px] h-[410px] shadow-2xl drop-shadow-[0_30px_60px_rgba(50,50,93,0.25)] rounded-3xl bg-white px-12 pt-14 pb-10 flex flex-col gap-6 justify-center lg:mx-0 mx-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 flex-col">
            <img src={Logo} alt="" className="w-24" />
            <h1 className="text-3xl">Login</h1>
          </div>
          <p className="text-gray-400">Silahkan login ke Edu Quiz!</p>
        </div>

        <Form
          name="formlogin"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Harap masukkan email anda!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Harap masukkan password anda!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-tema-green border-none hover:bg-yellow-400 mb-2"
              style={{
                color: 'white',
              }}
            >
              Login
            </Button>
            <div className="text-center">
              Belum punya akun? Silahkan{' '}
              <Link
                to="/register"
                className="text-tema-green hover:text-yellow-400"
              >
                Daftar!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
export default Login
