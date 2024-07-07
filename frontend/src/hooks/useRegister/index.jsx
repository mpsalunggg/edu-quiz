import { message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { REGISTER } from '../../utils/endpoint'

const useRegister = () => {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    const data = {
      ...event,
      role: 'student',
    }

    message.loading({
      content: 'Loading...',
    })

    const register = async () => {
      try {
        const res = await axios.post(REGISTER, data)
        message.destroy()
        message.success({
          content: res.data.message,
          duration: 4,
          onClose() {
            navigate('/verification-email')
          },
        })
      } catch (err) {
        message.destroy()
        message.error({
          content: err.response.data.message,
        })
      }
    }
    register()
  }
  return { handleSubmit }
}
export default useRegister
