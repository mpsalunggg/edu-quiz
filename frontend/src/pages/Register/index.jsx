import RegisterIcon from '../../assets/images/registericon.svg'
import Logo from '../../assets/images/logo.svg'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks'

const Register = () => {
  const { handleSubmit } = useRegister()

  return (
    <section className="bg-white h-screen flex justify-center items-center gap-12">
      <div className="w-[400px] drop-shadow-[0_30px_60px_rgba(50,50,93,0.25)] rounded-3xl bg-white px-12 pt-12 pb-8 flex flex-col gap-6 justify-center lg:mx-0 mx-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 flex-col">
            <img src={Logo} alt="" className="w-24" />
            <h1 className="text-3xl">Register</h1>
          </div>
          <p className="text-gray-400">Silahkan Daftarkan Akun Anda!</p>
        </div>

        <Form name="formregister" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              className="w-full bg-tema-green border-none hover:bg-yellow-400 mb-2"
              style={{
                color: 'white',
              }}
              // disabled={active}
            >
              Daftar
            </Button>
            <p className="text-center mt-2">
              Sudah punya akun?, Yuk{' '}
              <Link
                to={'/login'}
                className="text-tema-green hover:text-yellow-400"
              >
                Masuk
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
      <img
        src={RegisterIcon}
        alt="Login Icon"
        className="md:w-86 lg:w-96 md:inline hidden"
      />
    </section>
  )
}
export default Register
