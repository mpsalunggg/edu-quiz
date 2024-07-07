/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { LOGIN } from '../../utils/endpoint'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { setSessionData, setToken } from '../../utils/sessionStorage'

const useLogin = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    message.loading({
      content: 'Loading...',
    })
    const login = async () => {
      try {
        const res = await axios.post(LOGIN, event)
        setSessionData('user', res.data?.user)
        setToken('token', res.data?.token)
        message.destroy()
        message.success({
          content: res.data.message,
          onClose() {
            navigate('/dashboard')
          },
        })
      } catch (err) {
        message.destroy()
        message.error({
          content: err.response.data.message,
        })
      }
    }
    login()
  }

  return { handleSubmit }
}
export default useLogin
