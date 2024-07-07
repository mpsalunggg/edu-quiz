export const setSessionData = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving data to sessionStorage:', error)
  }
}

export const getSessionData = (key) => {
  try {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting data from sessionStorage:', error)
    return null
  }
}

export const removeSessionData = (key) => {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing data from sessionStorage:', error)
  }
}

export const setToken = (key, data) => {
  try {
    sessionStorage.setItem(key, data)
  } catch (error) {
    console.error('Error saving token to sessionStorage:', error)
  }
}

export const getToken = () => {
  try {
    const token = sessionStorage.getItem('token')
    return token
  } catch (error) {
    console.error('Error get token from sessionStorage:', error)
  }
}
