/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { QUIZ } from '../../../utils/endpoint'

const useGetAllQuizWithUser = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const getData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(QUIZ + 'with-user')
      setData(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return { data, loading, getData }
}
export default useGetAllQuizWithUser
