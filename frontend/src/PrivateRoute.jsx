/* eslint-disable react/prop-types */

import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import { getToken } from './utils/sessionStorage'

const PrivateRoute = ({ children }) => {
  const token = getToken()

  console.log(token)
  if (token) {
    try {
      const decoded = jwtDecode(token)
      const isTokenValid = decoded.exp > Date.now() / 1000

      if (isTokenValid) {
        return children
      } else {
        return <Navigate to={'/login'} />
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      return <Navigate to={'/login'} />
    }
  } else {
    console.log('Token not present')
    return <Navigate to={'/login'} />
  }
}

export default PrivateRoute
