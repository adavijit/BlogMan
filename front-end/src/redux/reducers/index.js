import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'

export default combineReducers({
  user,
  auth
})
