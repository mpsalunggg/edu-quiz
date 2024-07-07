/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { VERIFY } from '../../utils/endpoint'

const useVerification = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const verify = async () => {
      setLoading(true)
      try {
        await axios.get(VERIFY + token)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    verify()
  }, [token])
  return { loading }
}
export default useVerification
