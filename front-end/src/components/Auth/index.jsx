import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const isAuthenticated = userId => {
    if(JSON.parse(localStorage.getItem('user')).id === userId) return true
}

export default setAuthToken
