import axios from 'axios'
import { QUIZ } from '../../../utils/endpoint'
// import useGetAllQuizWithUser from '../useGetAllQuizWithUser'

const useDeleteQuiz = () => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(QUIZ + id)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  return { handleDelete }
}
export default useDeleteQuiz
