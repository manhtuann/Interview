import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export default store
export type AppDispatch = typeof store.dispatch;